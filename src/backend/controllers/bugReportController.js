const BugReport = require("../models/bugreports");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory as Buffer

const upload = multer({ storage: storage })


exports.updateBugReport = async (req, res) => {
  try {
    console.log(req.file,"this is my file")
      console.log("Received Data:", req.body); // Log the form fields
      if (!req.file) {
          console.log("No file uploaded.");
      } else {
          console.log("Uploaded File Details:", req.file);
      }

      // Create a new bug report instance
      const newBugReport = new BugReport({
          title: req.body.name,
          email: req.body.email,
          issue: req.body.issue,
          reproduceIssue: req.body.message,
          file: req.file
              ? { data: req.file.buffer, contentType: req.file.mimetype }
              : null, // Store file buffer & content type
      });
    

      console.log("Bug Report Object:", newBugReport);

      // Save to MongoDB
      await newBugReport.save();

      res.status(201).json({
          message: "Bug report submitted successfully",
          bugReport: newBugReport,
      });

  } catch (error) {
      console.error("Error in submitting bug report:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
