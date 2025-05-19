const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    // User and email are unique
    // user, email, password and dateOfBirth are required

    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }, 
    
    favorite_books: [
        {
            title: { type: String }, // Book title
            author: { type: String }, // Book author
            genre: { type: String }, // Genre of the book
            description: { type: String },
            thumbnail: { type: String }, // Optional description
            id:{type:String}
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
          favorite_movies: [
            {
                title: { type: String }, // Movie title
                genre: {type:Number}, // Genre of the book
                description: { type: String },
                thumbnail: { type: String }, // Optional description
                id:{type:Number}
                // Add any other fields you need for each book
            }],
            survey: {
                selectedGenres: [String],
                preferred_language: { type: String, default: null },
                movie_length: { type: String, default: null },
                period: { type: String, default: null },
              },
              hasCompletedSurvey: {
                type: Boolean,
                default: false,
              },
              vector: {
                type: [Number], // One-hot encoded vector
                default: [],
              },
            displayboard: [
              {
                boardID: {type: Number}, //Which display is being stored (1=Left, 3=Right)
                media: {type: String}, //type of media being stored
                title: {type: String}, //item title
                thumbnail: {type: String}, //item thumbnail
                id: {}
              }
            ],
});

// Force lowercase for username and email before saving
userSchema.pre('save', function (next) {
  if (this.isModified('username')) {
    this.username = this.username.toLowerCase();
  }
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

 //const User = mongoose.model('User', userSchema)    // User represents the whole schema now
 module.exports = User  // to be able to use this in any other file