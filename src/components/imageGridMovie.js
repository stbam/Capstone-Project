import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '9acc16caf27143a749376727fd222dc6'; // Replace with your actual API key
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieGrid({ maxResults = 10, query, setQuery }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchQuery = query ? `query=${query}` : 'query=popular';
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&${searchQuery}&language=en-US&page=1`);
        const data = await response.json();
        setMovies(data.results.slice(0, maxResults)); // Limit results
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query, maxResults]);

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    width: 300,
                    height: 450,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    outline: 'none',
                    transition: '.3s',
                    '&:hover': { opacity: 0.8 },
                    cursor: 'pointer',
                    '&:active': {
                      opacity: 0.7,
                      transform: 'scale(0.98)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/150'}
                    alt={movie.title}
                    sx={{ objectFit: 'contain' }}
                  />
                  <CardContent sx={{ display: 'flex', marginLeft: '10px' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#f5f5f5', fontSize: '14px' }}>
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
