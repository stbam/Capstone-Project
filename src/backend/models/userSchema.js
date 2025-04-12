const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    // User and email are unique
    // user, email, password and dateOfBirth are required

    username: {
        type: String,
      
    },
    email: {
        type: String,
     
    },
    password: {
        type: String,
      
      //  minlength: [8, 'Password must be 8 characters long']
    }, 
    favorite_books: [
        {
            title: { type: String }, // Book title
            author: { type: String }, // Book author
            genre: { type: String }, // Genre of the book
            description: { type: String },
            thumbnail: { type: String } // Optional description
            // Add any other fields you need for each book
        }],
        profile_picture: {
            data: Buffer,
            contentType: String,
            
          },
          banner_image: { 
            data: Buffer,
            contentType: String,
          },
 })

 const User = mongoose.models.User || mongoose.model('User', userSchema);

 //const User = mongoose.model('User', userSchema)    // User represents the whole schema now
 module.exports = User  // to be able to use this in any other file