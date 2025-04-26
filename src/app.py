from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from oneHot import build_user_vector  # Import the one-hot encoding function
from cosine import cosine_similarity  # Import the cosine similarity function
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

# Genre IDs expected
GENRES = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]

@app.route("/rank", methods=["POST"])
def rank_movies():
    try:
        data = request.get_json()
        movies = data.get("movies", [])
        user_preferences = data.get("user_preferences", {})

        if not isinstance(movies, list) or not movies:
            return jsonify({"error": "Invalid or empty movies list"}), 400

        if not user_preferences:
            return jsonify({"error": "User preferences are required"}), 400

        # Provide default values for missing keys
        preferred_length = user_preferences.get('preferredLength', 'No preference')
        time_periods = user_preferences.get('timePeriods', [])
        languages = user_preferences.get('languages', [])

        # Build the user vector using one-hot encoding
        user_preferences = {
            'preferredLength': preferred_length,
            'timePeriods': time_periods,
            'languages': languages
        }
        user_vector = build_user_vector(user_preferences)

        ranked_movies = []

        for movie in movies:
            # Get genre_ids from the movie, default to empty list if not found
            genre_ids = movie.get("genre_ids", [])
            if not genre_ids:
                print(f"Movie '{movie.get('title', 'Unknown')}' has no genres, skipping.")
                continue  # Skip movies without genre data

            # Convert genre_ids to genre names using the GENRES list
            valid_genre_ids = [i for i in genre_ids if i < len(GENRES)]
            movie_preferences = {"genres": [GENRES[i] for i in valid_genre_ids]}

            # Check if movie_preferences contains genres
            if not movie_preferences.get("genres"):
                print(f"Movie '{movie.get('title', 'Unknown')}' has no valid genres, skipping.")
                continue  # Skip movies without valid genres

            print(f"Movie '{movie.get('title', 'Unknown')}' genres: {movie_preferences.get('genres')}")

            # Build the one-hot encoded vector for the movie's genres
            genre_one_hot = build_user_vector(movie_preferences)

            normalized_popularity = movie.get("popularity", 50) / 100
            normalized_vote_average = (movie.get("vote_average", 5) - 1) / 9
            normalized_runtime = movie.get("runtime", 90) / 180

            release_year = 2000
            if movie.get("release_date"):
                try:
                    release_year = int(movie["release_date"].split("-")[0])
                except:
                    pass
            normalized_year = (release_year - 1900) / 130

            movie_vector = np.concatenate([
                genre_one_hot,
                [normalized_popularity, normalized_vote_average, normalized_runtime, normalized_year]
            ])

            score = cosine_similarity(user_vector, movie_vector)
            ranked_movies.append({"movie": movie, "score": float(score)})

        ranked_movies.sort(key=lambda x: x["score"], reverse=True)

        return jsonify(ranked_movies)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/movie-interaction", methods=["POST"])
def movie_interaction():
    data = request.get_json()
    print("User clicked movie:", data)
    return jsonify({"message": "Interaction logged"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5003)
