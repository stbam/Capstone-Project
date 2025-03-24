const mongoose = require('mongoose');
const Game = require('./models/Game');
const Genre = require('./models/Genre');

// Connect to MongoDB (ensure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/steamgamesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Inserting a new genre (you can loop through this for multiple genres)
const insertGenres = async () => {
    const genres = [
        'Action', 'Adventure', 'Strategy', 'RPG', 'Shooter', 'Puzzle', 
        'Indie', 'Multiplayer', 'Simulation', 'Sports', 'Fighting', 'Racing', 
        'Co-op', 'Sandbox', 'Survival', 'Open World', 'Horror', 'Casual', 
        'Massively Multiplayer', 'Anime', 'Early Access', 'VR', 'Sci-Fi', 
        'Fantasy', 'Platformer', 'Party', 'Story Rich', 'Walking Simulator',
        'MOBA', 'Educational', 'Music', 'Card Game', 'Real-Time Strategy', 
        'Tactical', 'Battle Royale', 'MMORPG', 'Tower Defense', 'Space', 'Turn-Based Strategy', 'Strategy'
    ]; // Updated list of popular Steam genres and tags
    
    for (let genreName of genres) {
        const genre = new Genre({ name: genreName });
        await genre.save();
        console.log(`${genreName} genre saved`);
    }
};

// Inserting a new game with multiple genres
const insertGame = async () => {
    const actionGenre = await Genre.findOne({ name: 'Action' });
    const adventureGenre = await Genre.findOne({ name: 'Adventure' });

    const game = new Game({
        name: 'Super Game',
        description: 'An exciting action-packed game',
        genre: actionGenre._id, // Associate the game with 'Action' genre
    });

    await game.save();
    console.log('Game saved');
};

// Fetching all genres and games for each genre
const fetchGamesByAllGenres = async () => {
    const genres = await Genre.find(); // Fetch all genres
    if (genres.length > 0) {
        // For each genre, find and log games associated with it
        for (const genre of genres) {
            const games = await Game.find({ genre: genre._id }); // Fetch all games for the current genre
            console.log(`Games in ${genre.name} genre:`, games);
        }
    } else {
        console.log('No genres found');
    }
};

// Insert genres and games, then fetch all games by genres
const initializeDatabase = async () => {
    await insertGenres();  // Insert genres first
    await insertGame();    // Insert game after genres
    await fetchGamesByAllGenres();  // Fetch all games after insertion
};

initializeDatabase();  // Run the initialization process
