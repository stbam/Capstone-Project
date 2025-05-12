import sys
import requests
import json

def build_user_vector(preferences):
    genres_list = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
        "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
        "Thriller", "TV Movie", "War", "Western"
    ]
    length_list = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"]
    time_period_list = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"]
    language_list = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"]

    genre_vector = [1 if genre in preferences.get('selectedGenres', []) else 0 for genre in genres_list]
    length_vector = [1 if length == preferences.get('movie_length', "No preference") else 0 for length in length_list]
    time_period_vector = [1 if period == preferences.get('period', "No preference") else 0 for period in time_period_list]
    language_vector = [1 if language == preferences.get('preferred_language', "No preference") else 0 for language in language_list]

    return genre_vector + length_vector + time_period_vector + language_vector

def fetch_user_data(user_id):
    url = f"http://localhost:3003/users/{user_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch user data: {response.status_code} {response.text}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 onehot.py <user_id>")
        sys.exit(1)

    user_id = sys.argv[1]

    try:
        user_data = fetch_user_data(user_id)
        survey_data = user_data.get("survey", {})
        user_vector = build_user_vector(survey_data)
        print(json.dumps(user_vector))  # <-- Output only the vector as JSON
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
