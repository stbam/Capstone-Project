import sys
import json

def build_movie_vector(movie):
    """
    Build a one-hot encoded vector based on movie features.
    """
    genres_list = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
        "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
        "Thriller", "TV Movie", "War", "Western"
    ]
    length_list = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"]
    time_period_list = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"]
    language_list = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"]
    
    # One-hot encode genres
    movie_genres = [genre for genre in movie.get('genres', [])]
    genre_vector = [1 if genre in movie_genres else 0 for genre in genres_list]
    
    # One-hot encode runtime (length)
    runtime = movie.get('runtime', 0)
    if runtime < 90:
        length = "Less than 90 minutes"
    elif 90 <= runtime <= 120:
        length = "90-120 minutes"
    elif 120 < runtime <= 150:
        length = "120-150 minutes"
    elif runtime > 150:
        length = "Over 150 minutes"
    else:
        length = "No preference"
    length_vector = [1 if length == l else 0 for l in length_list]
    
    # One-hot encode release period
    release_date = movie.get('release_date', "0000-00-00")
    release_year = int(release_date.split("-")[0]) if release_date != "0000-00-00" else 0
    if release_year < 1970:
        period = "Before 1970"
    elif 1970 <= release_year < 1980:
        period = "1970-1980"
    elif 1980 <= release_year < 1990:
        period = "1990-2000"
    elif 2000 <= release_year < 2010:
        period = "2010-2020"
    elif release_year >= 2020:
        period = "2020+"
    else:
        period = "No preference"
    time_period_vector = [1 if period == p else 0 for p in time_period_list]
    
    # One-hot encode language
    language = movie.get('original_language', "No preference").capitalize()
    language_vector = [1 if language == l else 0 for l in language_list]
    
    # Return the concatenated vector
    return genre_vector + length_vector + time_period_vector + language_vector

if __name__ == "__main__":
    """
    Main function to compute the movie vector.
    """
    movie_data = json.loads(sys.argv[1])  # Read movie data from command-line arguments
    movie_vector = build_movie_vector(movie_data)
    print(json.dumps(movie_vector))  # Output the movie vector as JSON