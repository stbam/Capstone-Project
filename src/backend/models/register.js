const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
      },
      email:{
        type:String,
        
      },
      password:{
        type:String,
      },
      favorite_books: [
        {
            title: { type: String }, // Book title
            author: { type: String }, // Book author
            genre: { type: String }, // Genre of the book
            description: { type: String }, // Optional description
            // Add any other fields you need for each book
        },
      
    ],
    profile_picture: {
        type: String, // Store the URL to the profile image
        
      },
      banner_image: {
        type: String, // Store the URL to the banner image
      },
})
/* controller "email: req.body.email"  email: part must matcch the schema or it wont be go to the databas */
module.exports = mongoose.model("register", registerSchema);