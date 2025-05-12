const genresList = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
    "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
    "Thriller", "TV Movie", "War", "Western"
];

function buildMovieVector(movie) {
    const lengthList = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"];
    const timePeriodList = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"];
    const languageList = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"];

    // One-hot encode genres
    const movieGenres = Array.isArray(movie.genres) ? movie.genres.map(genre => genre.name) : [];
    const genreVector = genresList.map(genre => movieGenres.includes(genre) ? 1 : 0);

    // One-hot encode preferred length
    // One-hot encode preferred length
    
    const runtime = movie.runtime || 0; // Default to 0 if runtime is undefined or null
    const lengthVector = lengthList.map(length => {
        if (runtime > 0 && runtime < 90) return length === "Less than 90 minutes" ? 1 : 0;
        if (runtime >= 90 && runtime <= 120) return length === "90-120 minutes" ? 1 : 0;
        if (runtime > 120 && runtime <= 150) return length === "120-150 minutes" ? 1 : 0;
        if (runtime > 150) return length === "Over 150 minutes" ? 1 : 0;
        return length === "No preference" ? 1 : 0;
    });
    console.log("Runtime:", runtime);

    // One-hot encode time periods
    const releaseYear = parseInt(movie.release_date?.split("-")[0]);
    const timePeriodVector = timePeriodList.map(period => {
        if (releaseYear < 1970) return period === "Before 1970" ? 1 : 0;
        if (releaseYear >= 1970 && releaseYear < 1980) return period === "1970-1980" ? 1 : 0;
        if (releaseYear >= 1990 && releaseYear < 2000) return period === "1990-2000" ? 1 : 0;
        if (releaseYear >= 2010 && releaseYear < 2020) return period === "2010-2020" ? 1 : 0;
        if (releaseYear >= 2020) return period === "2020+" ? 1 : 0;
        return period === "No preference" ? 1 : 0;
    });

    // One-hot encode languages
    const isoToLang = {
        "en": "English", "es": "Spanish", "fr": "French", "de": "German",
        "it": "Italian", "ja": "Japanese", "zh": "Chinese", "ko": "Korean",
        "pt": "Portuguese", "ru": "Russian"
    };
    const langCode = movie.language || movie.original_language; // fallback
    const langName = isoToLang[langCode] || null;
    const languageVector = languageList.map(language => language === langName ? 1 : 0);

    // Combine all vectors in the correct order
    return [...genreVector, ...lengthVector, ...timePeriodVector, ...languageVector];
}

module.exports = { buildMovieVector, genresList };