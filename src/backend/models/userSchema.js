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
    }
 })

 const User = mongoose.model('User', userSchema)    // User represents the whole schema now
 module.exports = User  // to be able to use this in any other file