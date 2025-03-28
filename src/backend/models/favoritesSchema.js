const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['book', 'movie', 'game'],
        required: true,
    },
    contentId: {
        type: String, // Unique Identifier (IMDB ID for movies, ISBN for books, etc)
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User collection _id
        required: true,
        ref: 'User', // Reference to the 'User' model (to link to a user)
    },
});

// Like model
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;