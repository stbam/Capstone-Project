const express = require('express') // setups server
const connect = require("./connect")
const cors = require('cors') // Helps minimize errors when connecting to database or API
const mongoose = require('mongoose') //makes it easy to connect to MongoDB and make schemas
const bodyParser = require('body-parser') // helps parse data into json
const bcrypt = require('bcryptjs') // hash passwords
const jwt = require('jsonwebtoken') // follows the user for the session
const multer = require('multer');
const bugReportController = require('./controllers/bugReportController');
const BookController= require('./controllers/BookController')
const UserController = require('./controllers/UserController')

const User = require('./models/userSchema')  // to use userschema

// *** UserRoutes file
const users = require("./userRoutes")

require("dotenv").config({path: "./config.env"})

// *** Moved to config.env. Delete these commented lines if everything works well
//const SECRET_KEY = 'super-secret-key'
const SECRET_KEY = process.env.SECRET_KEY;

// connect to express app
const app = express();


// *** Replaced this with Martin's code for User Authentication
/*
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
//process.env.ATLAS_URI
*/

// Middleware for JSON and URL-encoded data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *** User Routes
app.use(users)

// *** User Authentication part (Martin's Middleware) already uses cors. Make sure they don't conflict.
// Enable CORS for Frontend
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for User Authentication
//app.use(bodyParser.json()) both bodyParser and express.json try to read stream and then one of them crashes causing server to crash.
//Solution Remove this one.


//Routes

// Create   // POST REQUEST
// Read     // GET Request
// Update   //PUT or PATCH REQUEST
// Delete   // DELETE Request

// REGISTER
// USER REGISTRATION
// POST REGISTER

app.post('/register', async (req, res) => {
  console.log("test")
    try { 
        const { email, username, password } = req.body      // To request info we want from the user
        const hashedPassword = await bcrypt.hash(password, 10)  // Hash password, 10 is difficulty
        const newUser = new User({ email, username, password: hashedPassword }) 
        console.log(newUser)
        await newUser.save()    // Basically it creates a new schema with this info and save it

  



        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      console.log("error")
      console.log(error);
        res.status(500).json({ error: 'Error signing up' })
        
    }
})

//GET Registered Users
app.get('/register', async (req, res) => {  // To get
    try {
        const users = await User.find() // Attach schema (user) to find method and save it in users
        res.status(201).json(users) // Instead of rendering a message will render the users
        
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' })
    }
})

//GET LOGIN

app.post('/signin', async (req, res) => {
    try {

      console.log("TESTTT")
        const { username, password } = req.body
        const user = await User.findOne({ username })   // Using the schema it finds the username
        if (!user) {    // making sure the user is created
            return res.status(401).json({ error: 'Invalid credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password) // Compare password in database with password that user input
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' }) // When using json web token for user authentication it has to have a secret key
        res.json({ message: 'Login successful',
                    userId:user.id,
                    name:user.name
      
      
      })
        console.log("login successful")

        console.log(user._id)
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
})

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store files in the 'uploads' folder


// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body); // Log form fields
  console.log('Uploaded File:', req.file); // Log uploaded file
  
  next();
});

// Route for Bug Report sends file data to controllers folder bugReportController.js to process the data and do specific actions
app.post('/bugreport', upload.single('file'), bugReportController.updateBugReport);

//app.post('/register',registerController.register);


// *** Old Stanislav's code replaced with Martin's code. Left in case it needs to be reactivated.
// Start the server 
//app.listen(3003, () => console.log('✅ Server running on http://localhost:3000'));

app.post('/want-to-read',BookController.BookAdd);
app.get("/:username/books",BookController.getUserBook )
app.get("/user/profile-picture/:userId",UserController.userProfileGet)


app.put('/user-banner', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 }
]), UserController.UserProfileAdd);

mongoose
.connect(process.env.MONGO_URI, {           //these two help with the connection
  //  useNewUrlParser: true, //Not Needed 
   // useUnifiedTopology: true //Not Needed
})
.then(() => {
    app.listen(3003, () => {        // Use this port 3003
        console.log('Server connected to port 3003 and MongoDb')
    })
})
.catch((error) => {
  console.log(error)
    console.log('Unable to connect to Server and/or MongoDB', error)
    
})