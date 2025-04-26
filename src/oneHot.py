def build_user_vector(preferences):
    # Define your lists based on the user preferences
    genres_list = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
        "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
        "Thriller", "TV Movie", "War", "Western"
    ]
    length_list = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"]
    time_period_list = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"]
    language_list = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"]
    
    # One-hot encode genres
    genre_vector = [1 if genre in preferences['genres'] else 0 for genre in genres_list]
    
    # One-hot encode preferred length
    length_vector = [1 if length == preferences['preferredLength'] else 0 for length in length_list]
    
    # One-hot encode time periods
    time_period_vector = [1 if period in preferences['timePeriods'] else 0 for period in time_period_list]
    
    # One-hot encode languages
    language_vector = [1 if language in preferences['languages'] else 0 for language in language_list]
    
    # Return the concatenated vector
    return genre_vector + length_vector + time_period_vector + language_vector

# Example usage for testing
dummy_user_preferences = {
    "genres": ["Action", "Adventure", "Western"],
    "preferredLength": "90-120 minutes",
    "timePeriods": ["1990-2000", "2010-2020"],
    "languages": ["English", "Japanese"]
}

user_vector = build_user_vector(dummy_user_preferences)
print("User Vector:", user_vector)
print("Vector Length:", len(user_vector))
