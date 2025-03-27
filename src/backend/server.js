const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const bugReportController = require('./controllers/bugReportController');

const users = require("./userRoutes")

require("dotenv").config({path: "./config.env"})


const app = express();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
//process.env.ATLAS_URI
// Enable CORS for Frontend

app.use(users)


app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Store files in the 'uploads' folder

// Middleware for JSON and URL-encoded data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body); // Log form fields
  console.log('Uploaded File:', req.file); // Log uploaded file
  next();
});

// Route for Bug Report sends file data to controllers folder bugReportController.js to process the data and do specific actions
app.post('/bugreport', upload.single('file'), bugReportController.updateBugReport);

// Start the server
app.listen(3003, () => console.log('✅ Server running on http://localhost:3000'));

