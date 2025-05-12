const axios = require('axios');

// Lists for one-hot encoding
const genresList = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
    "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
    "Thriller", "TV Movie", "War", "Western"
];
const lengthList = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"];
const timePeriodList = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"];
const languageList = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"];

// Function to fetch user data from the API
async function fetchUserData(userId) {
    const url = `http://localhost:3003/users/${userId}`;  // Replace with your API endpoint
    try {
        const response = await axios.get(url);
        return response.data;  // Return the user data as a JSON object
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw new Error('Failed to fetch user data');
    }
}

// Function to build the user vector based on preferences
function buildUserVector(preferences) {
    // One-hot encode genres
    const genreVector = genresList.map(genre => preferences.selectedGenres.includes(genre) ? 1 : 0);

    // One-hot encode preferred length
    const lengthVector = lengthList.map(length => length === preferences.movieLength ? 1 : 0);

    // One-hot encode time periods
    const timePeriodVector = timePeriodList.map(period => period === preferences.period ? 1 : 0);

    // One-hot encode languages
    const languageVector = languageList.map(language => language === preferences.preferredLanguage ? 1 : 0);

    // Return the concatenated vector
    return [...genreVector, ...lengthVector, ...timePeriodVector, ...languageVector];
}

// Function to print the user vector with labels
function printUserVectorWithLabels(userVector) {
    console.log("\nUser Vector Breakdown:");

    // Genres
    console.log("Genres:");
    genresList.forEach((genre, i) => console.log(`${genre}: ${userVector[i]}`));

    // Length
    let offset = genresList.length;
    console.log("\nPreferred Length:");
    lengthList.forEach((length, i) => console.log(`${length}: ${userVector[offset + i]}`));

    // Time Period
    offset += lengthList.length;
    console.log("\nTime Period:");
    timePeriodList.forEach((period, i) => console.log(`${period}: ${userVector[offset + i]}`));

    // Language
    offset += timePeriodList.length;
    console.log("\nPreferred Language:");
    languageList.forEach((language, i) => console.log(`${language}: ${userVector[offset + i]}`));
}

// Main function to integrate everything
async function generateUserVector(userId) {
    try {
        // Fetch user data
        const userData = await fetchUserData(userId);
        console.log("Fetched user data:");
        console.log(JSON.stringify(userData, null, 4));  // Pretty-print the user data

        // Extract preferences from the survey data
        const surveyData = userData.survey || {};  // Default to an empty object if no survey data

        console.log("\nSurvey data:");
        console.log(JSON.stringify(surveyData, null, 4));  // Pretty-print the survey data

        // Build the user vector
        const userVector = buildUserVector(surveyData);
        console.log("\nUser Vector:", userVector);
        console.log("Vector Length:", userVector.length);

        // Print the user vector with labels
        printUserVectorWithLabels(userVector);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage: replace with your user ID
const userId = "6811552fe330c6c4dc9ceb1e";
generateUserVector(userId);
