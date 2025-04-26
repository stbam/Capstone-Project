import numpy as np

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_a = np.linalg.norm(vec1)
    norm_b = np.linalg.norm(vec2)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot_product / (norm_a * norm_b)

# Example usage
user_vector = np.array([0, 1, 1, 0])
movie_vector = np.array([0, 1, 1, 0])

similarity = cosine_similarity(user_vector, movie_vector)
print("Similarity:", similarity)
