import React, { useState, useEffect} from 'react';
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

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export default function BasicGrid({ maxResults, query,setQuery}) {
  //console.log(query)
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchQuery = query ? `q=${query}` : 'q=subject:books'; // Use query if available
        const response = await fetch(`${API_URL}?${searchQuery}&maxResults=${maxResults}`);
        const data = await response.json();
        setBooks(data.items); // Handle case if no books are returned
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [query, maxResults]); // Re-fetch when query or maxResults change

  
  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {books.map((book, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Item>
            <Link
                to={`/book/${book.id}`}  // Link to the book details page
                style={{ textDecoration: 'none' }}
              >
                
              <Card sx={{
                width: 300, height: 450, backgroundColor: 'transparent', boxShadow: 'none', outline: 'none', transition: '.3s', 
                '&:hover': { opacity: .8 }, cursor: 'pointer', '&:active': {
                  opacity: 0.7, // Darker effect on click
                  transform: 'scale(0.98)', // Slightly shrink the card on click
                },
                
              }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                  alt={`Book ${index + 1}`}
                  sx={{ objectFit: 'contain',

                  
                }}
                />
                <CardContent sx={{ display: 'flex', marginLeft: '10px' }}>
                  <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {book.volumeInfo.categories?.map((genre, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          color: '#f5f5f5',
                          backgroundColor: '#3e3e3e',
                          borderRadius: '5px',
                          padding: '5px',
                          fontSize: '12px',
                        }}
                      >
                        {genre}
                      </Typography>
                    ))}
                  </Box>
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
