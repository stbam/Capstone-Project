const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    // User and email are unique
    // user, email, password and dateOfBirth are required

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password must be 8 characters long']
    },
    age: {
        type: Number,
        required: true
    },
    likedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like' // Reference to the 'Like' model
    }],
    favoriteGenres: {
        type: [String] // Array of strings to store multiple genres
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    }
 })

 const User = mongoose.model('User', userSchema)    // User represents the whole schema now
 module.exports = User  // to be able to use this in any other file