
import React from 'react';

function MovieList({ movies }) {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            style={{width: "290px", height: "435px"}}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
