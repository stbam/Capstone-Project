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


    const userId = req.body.userId;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Process uploaded files
    if (req.files["profile_picture"]) {
      const profilePicBuffer = req.files["profile_picture"][0].buffer;
      const profilePicBase64 = profilePicBuffer.toString("base64");
      user.profile_picture = `data:${req.files["profile_picture"][0].mimetype};base64,${profilePicBase64}`;
    }

    if (req.files["banner_image"]) {
      const bannerBuffer = req.files["banner_image"][0].buffer;
      const bannerBase64 = bannerBuffer.toString("base64");
      user.banner_image = `data:${req.files["banner_image"][0].mimetype};base64,${bannerBase64}`;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated with uploaded files.",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error updating profile" });
  }
};
