/*
    added by gabe
    fetches the userid of current logged in user
    to be used for recommendations based on user
*/
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    sessionId: String,
    userId: String,
    createdAt: { type: Date, default: Date.now, expires: '7d' } // auto-expire
});

module.exports = mongoose.model("Session", sessionSchema);
