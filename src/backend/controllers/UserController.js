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
  console.log(user.profile_picture)
    // Replace the banner_image if it's provided
    if (req.files["banner_image"]) {
      const bannerBuffer = req.files["banner_image"][0].buffer;
      const bannerContentType = req.files["banner_image"][0].mimetype;
      // Replace the old banner_image with the new one
      user.banner_image = { data: bannerBuffer, contentType: bannerContentType };
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
exports.userProfileGet = async(req,res)=>{
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user || !user.profile_picture) {
      return res.status(404).json({ error: "Profile picture not found" });
    }

    const base64Image = user.profile_picture.data.toString("base64");

    res.json({
      contentType: user.profile_picture.contentType,
      data: base64Image,
    });

};