const User = require("../models/UserSchema");
const multer = require("multer");

// Memory storage (for saving in buffer, like to upload to S3 or DB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle the upload of two images
exports.uploadImages = upload.fields(
    [
   
  { name: "profile_picture", maxCount: 1 },
  { name: "banner_image", maxCount: 1 },
  { name: 'displayboard', maxCount: 3},
]);

exports.UserProfileAdd = async (req, res) => {
  try {
    // Log the received files for debugging purposes (comment out in production)
    // console.log("Files received on user Controller:", req.files); 
  
    const userId = req.body.userId;
  
    if (!userId) return res.status(400).json({ error: "User ID is required" });
  
    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });


    // Replace the profile_picture if it's provided
    if (req.files["profile_picture"]) {
      const profilePicBuffer = req.files["profile_picture"][0].buffer;
      const profilePicContentType = req.files["profile_picture"][0].mimetype;
      // Replace the old profile_picture with the new one
      user.profile_picture = { data: profilePicBuffer, contentType: profilePicContentType };
    }
  //console.log(user.profile_picture)
    // Replace the banner_image if it's provided
    if (req.files["banner_image"]) {
      const bannerBuffer = req.files["banner_image"][0].buffer;
      const bannerContentType = req.files["banner_image"][0].mimetype;
      // Replace the old banner_image with the new one
      user.banner_image = { data: bannerBuffer, contentType: bannerContentType };
    }
  
    // Update displayboards with newly selected items
    if (req.body.left_displayboard != '[]') {
      const leftDisplay = JSON.parse(req.body.left_displayboard);
      console.log(leftDisplay)
      user.displayboard[0] = { boardID: leftDisplay.boardID, media: leftDisplay.media, title: leftDisplay.title, thumbnail: leftDisplay.thumbnail, id: leftDisplay.id };
    }
    if (req.body.middle_displayboard != '[]') {
      console.log(req.body.middle_displayboard)
      const middleDisplay = JSON.parse(req.body.middle_displayboard);
      console.log(middleDisplay)
      user.displayboard[1] = { boardID: middleDisplay.boardID, media: middleDisplay.media, title: middleDisplay.title, thumbnail: middleDisplay.thumbnail, id: middleDisplay.id };
    }
    if (req.body.right_displayboard != '[]') {
      const rightDisplay = JSON.parse(req.body.right_displayboard);
      console.log(rightDisplay)
      user.displayboard[2] = { boardID: rightDisplay.boardID, media: rightDisplay.media, title: rightDisplay.title, thumbnail: rightDisplay.thumbnail, id: rightDisplay.id };
    }

    // Save the updated user document
    await user.save();
  
    res.status(200).json({
      message: "Profile updated with the uploaded files.",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error updating profile" });
  }
};
// In src/backend/controllers/UserController.js

// In src/backend/controllers/UserController.js

exports.userProfileGet = async (req, res) => {
    const userId = req.params.userId; // Or however you get the userId
    try {
        const user = await User.findById(userId);  // Using async/await to get the user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Debug: Log the user profile picture
      //  console.log(user.profile_picture);

        if (user.profile_picture && user.profile_picture.data) {
            // Only proceed if profile_picture exists and has data
            const base64Image = user.profile_picture.data.toString("base64");
            res.json({ contentType: user.profile_picture.contentType, data: base64Image });
        } else {
            // If profile picture is not found or has no data
            res.status(404).json({ message: "Profile picture not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

exports.userBannerGet = async (req, res) => {
    console.log("bann")
    const userId = req.params.userId; // Or however you get the userId
    console.log("test banner")
    try {
        const user = await User.findById(userId); // Using async/await to get the user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Debug: Log the user's banner image
       // console.log(user.banner_image);

        if (user.banner_image && user.banner_image.data) {
            // Only proceed if banner_image exists and has data
            const base64Image = user.banner_image.data.toString("base64");
            res.json({ contentType: user.banner_image.contentType, data: base64Image });
        } else {
            // If banner image is not found or has no data
            res.status(404).json({ message: "Banner image not found" });
        }
    } catch (error) {
        console.error("Error fetching user banner:", error);
        res.status(500).json({ message: "Error fetching user banner" });
    }
};

exports.userDisplayboardGet = async (req,res) => {
  //console.log("diss")
  const userId = req.params.userId;
  //console.log("test display")
  try {
    const user = await User.findById(userId); // Using async/await to get the user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.displayboard) {
      // Only proceed if display exist
      res.json({data: user.displayboard})
    } else {
      // If display is not found or has no data
      res.status(404).json({ message: "Display not found" })
    }
  } catch (error) {
    console.error("Error fetching user display: ", error);
    res.status(500).json({ message: "Error fetching user display" })
  }
}

exports.userNameGet = async (req, res) => {
  //console.log("name")
  const userId = req.params.userId; // Or however you get the userId
  //console.log("test name")
  try {
      const user = await User.findById(userId); // Using async/await to get the user
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Debug: Log the user's name
     console.log(user.username);

      if (user.username) {
          // Only proceed if name exists
          res.json({ data: user.username });
      } else {
        // If name is not found or has no data
          res.status(404).json({ message: "Name not found" });
      }
  } catch (error) {
      console.error("Error fetching user name:", error);
      res.status(500).json({ message: "Error fetching user name" });
  }
};