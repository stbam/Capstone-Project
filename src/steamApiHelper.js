const axios = require("axios");

async function fetchSteamGameDetails(appid) {
    try {
        const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
        console.log(`Fetching details for appid: ${appid}`);

        const { data } = await axios.get(gameDetailsUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        console.log("Raw API response:", data);

        if (data[appid]?.success) {
            const gameDetails = data[appid].data;
            return {
                name: gameDetails.name || "No name available",
                type: gameDetails.type || "Unknown",
                is_free: gameDetails.is_free ?? false,
                about_the_game: gameDetails.about_the_game
                    ? gameDetails.about_the_game.replace(/<[^>]*>?/gm, "")
                    : "No about information available.",
                short_description: gameDetails.short_description || "No description available.",
                supported_languages: gameDetails.supported_languages
                    ? gameDetails.supported_languages.replace(/<[^>]*>?/gm, "").split(", ")
                    : ["Unknown"],
                header_image: gameDetails.header_image || null,
                developers: gameDetails.developers && gameDetails.developers.length > 0
                    ? gameDetails.developers
                    : ["Unknown"],
                publishers: gameDetails.publishers && gameDetails.publishers.length > 0
                    ? gameDetails.publishers
                    : ["Unknown"],
                price_overview: gameDetails.price_overview
                    ? {
                          currency: gameDetails.price_overview.currency || "Unknown",
                          final_formatted: gameDetails.price_overview.final_formatted || "Free or Unavailable",
                      }
                    : { currency: "Unknown", final_formatted: "Free or Unavailable", discount_percent: 0 },
                platforms: {
                    windows: gameDetails.platforms?.windows ?? false,
                    mac: gameDetails.platforms?.mac ?? false,
                    linux: gameDetails.platforms?.linux ?? false,
                },
                genres: gameDetails.genres 
                ? gameDetails.genres.map((g) => ({ id: g.id, name: g.description })) 
                : [],
                screenshots: gameDetails.screenshots ? gameDetails.screenshots.map((s) => s.path_full) : [],
                movies: gameDetails.movies ? gameDetails.movies.map((m) => m.webm.max || m.mp4.max) : [],
                release_date: gameDetails.release_date ? gameDetails.release_date.date : "Unknown",
            };
        } else {
            throw new Error("Game details not found.");
        }
    } catch (error) {
        console.error("Error fetching game details:", error.message);
        throw new Error(error.message);
    }
}

module.exports = { fetchSteamGameDetails };
