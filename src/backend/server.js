const express = require('express'); // setups server
const { connectToServer } = require("./connect"); // Import connect.js
const cors = require('cors'); // Helps minimize errors when connecting to database or API
const bodyParser = require('body-parser'); // helps parse data into json
const bcrypt = require('bcryptjs'); // hash passwords
const jwt = require('jsonwebtoken'); // follows the user for the session
const multer = require('multer');
const bugReportController = require('./controllers/bugReportController');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');
const MovieController = require('./controllers/MovieController');
const User = require('./models/userSchema'); // to use userschema
const users = require("./userRoutes"); // UserRoutes file

require("dotenv").config({ path: "./config.env" });

const SECRET_KEY = process.env.SECRET_KEY;

// Connect to express app
const app = express();
const PORT = 3003;

// Middleware for JSON and URL-encoded data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for Frontend
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// User Routes
app.use(users);

// REGISTER
app.post('/register', async (req, res) => {
  try {
    const { email, username, password, age } = req.body; // To request info we want from the user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password, 10 is difficulty
    const newUser = new User({ email, username, password: hashedPassword, age });
    await newUser.save(); // Save the new user to the database
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: 'Error signing up' });
  }
});

// GET Registered Users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' });
  }
});

// LOGIN
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).maxTimeMS(30000);; // Find user by username
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' }); // Generate JWT token
    res.json({
      message: 'Login successful',
      token, //added by gabe
      userId: user.id,
      name: user.name
      
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store files in memory

// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body); // Log form fields
  console.log('Uploaded File:', req.file); // Log uploaded file
  next();
});

// Route for Bug Report
app.post('/bugreport', upload.single('file'), bugReportController.updateBugReport);

// Movie and Book Routes
app.post('/want-to-watch', MovieController.MovieAdd);
app.get("/:username/movies", MovieController.getUserMovie);
app.post('/want-to-read', BookController.BookAdd);
app.get("/:username/books", BookController.getUserBook);

// User Profile Routes
app.get("/user/profile-picture/:userId", UserController.userProfileGet);
app.get("/user/profile-banner/:userId", UserController.userBannerGet);
app.put('/user-banner', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 }
]), UserController.UserProfileAdd);

// PUT Survey
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

// Connect to MongoDB and Start the Server
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB... [server.js]");
    await connectToServer(); // Call connect.js to initialize MongoDB connection
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server connected to port ${PORT} and MongoDb`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};


/* ADDED BY GABE */

// Helper function to run Python scripts
function runPythonScript(scriptPath, args) {
  return new Promise((resolve, reject) => {
    execFile("python3", [scriptPath, ...args], (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running ${scriptPath}:`, stderr);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

startServer();