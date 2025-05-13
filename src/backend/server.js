const express = require('express'); // setups server
const connect = require("./connect");
const cors = require('cors'); // Helps minimize errors when connecting to database or API
const mongoose = require('mongoose'); //makes it easy to connect to MongoDB and make schemas
const bodyParser = require('body-parser'); // helps parse data into json
const bcrypt = require('bcryptjs'); // hash passwords
const jwt = require('jsonwebtoken'); // follows the user for the session
const multer = require('multer');
const bugReportController = require('./controllers/bugReportController');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');
const MovieController = require('./controllers/MovieController');
const User = require('./models/userSchema');  // to use userschema

// Express app must be initialized BEFORE routes are applied
const app = express();

// Load environment variables
require("dotenv").config({ path: "./config.env" });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Debug middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);
  next();
});

// Route files (must come AFTER app is declared)
const userRoutes = require("./userRoutes");
app.use(userRoutes); // include your custom /users routes

// ----------------------------------------
// Auth Routes
// ----------------------------------------

app.post('/register', async (req, res) => {
  try {
    const { email, username, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      age,
      isNewUser: true // ✅ explicitly set isNewUser
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log("Error registering:", error);
    res.status(500).json({ error: 'Error signing up' });
  }
});

app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });
    res.json({
      message: 'Login successful',
      userId: user.id,
      isNewUser: user.isNewUser || false,
      name: user.name
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// ----------------------------------------
// App-Specific Routes
// ----------------------------------------

app.post('/bugreport', upload.single('file'), bugReportController.updateBugReport);

app.post('/want-to-watch', MovieController.MovieAdd);
app.get('/:username/movies', MovieController.getUserMovie);

app.post('/want-to-read', BookController.BookAdd);
app.get('/:username/books', BookController.getUserBook);

app.get('/user/profile-picture/:userId', UserController.userProfileGet);
app.get('/user/profile-banner/:userId', UserController.userBannerGet);

app.put('/user-banner', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 }
]), UserController.UserProfileAdd);

// PUT: Submit Survey
app.put('/user/survey/:userId', async (req, res) => {
  const { userId } = req.params;
  const surveyData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { survey: surveyData },
      { new: true }
    );
    res.status(200).json({ message: "Survey updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ error: "Failed to update survey" });
  }
});

// ----------------------------------------
// MongoDB & Server Startup
// ----------------------------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3003, () => {
      console.log('✅ Server connected to port 3003 and MongoDB');
    });
  })
  .catch((error) => {
    console.error('❌ Unable to connect to MongoDB:', error);
  });
