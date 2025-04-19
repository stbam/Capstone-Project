import React, { useState, useEffect } from 'react';
import { Box, Container, ButtonGroup, Card, CardMedia, Typography, Button, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';

import Books from './books';

const BookDetails = () => {

  const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage
  const name = localStorage.getItem('username')

  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);
  //const [userId, setUserId] = useState(null); // Add state for userId

  const handleWantToRead = async()=>{
      const bookData = {
         title: book.title,
            genre:book.genre,
            description:book.description,
            author:book.author,
            userId,
            thumbnail: book.imageLinks?.thumbnail,
            id:book.id
      }
      try{
        console.log(id,"this is the book id")
        //console.log(localStorage.getItem("userId"));

        const response = await fetch("http://localhost:3003/want-to-read",{
          method:'POST',

          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(bookData)
        })

          if(response.ok){
           // alert('Book added to your Want To Read list!');
          }else{
            console.error('Failed to add book.');
          }
      }
      catch(error){
        console.log("here is the error")
      }

  }






  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
       // setBook(data.volumeInfo); // Set the detailed book information
       setBook({
        id: data.id,
        ...data.volumeInfo
      });
      } catch (error) {
        console.log('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Container sx={{ marginTop: '200px' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // Two equal columns
          gap: 4, // Space between columns
          marginTop: 10,
        }}
      >
        {/* Left Section - Book Cover and Rating */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Card sx={{ width: 250 }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 'auto' }}
              image={book.imageLinks?.thumbnail || 'https://via.placeholder.com/200'}
              alt={book.title}
            />
          </Card>
          <ButtonGroup sx={{ mt: 2 }} >
            <Button variant="contained" color="primary" onClick={handleWantToRead}>Want To Read </Button> 
            <a href={book.infoLink} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" color="primary">
                More Info
              </Button>
            </a>
          
          </ButtonGroup>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Rating />
            <Typography sx={{color:"white"}}>Rate This Book</Typography>
          </Box>
        </Box>

        {/* Right Section - Book Details */}
        <Box sx={{ mt: 2 }}>
          <Box>

          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="white" sx={{ mt: 1 ,fontWeight: 'bold',fontSize:"18px"}}>
            {book.authors?.join(', ')}
          </Typography>
          <Typography sx={{color:"white"}}>
              Average Rating: {book.averageRating || 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color:"white"}} 
              dangerouslySetInnerHTML={{ __html: book.description || 'No description available.' }}
            />
               </Box>
          <Box sx={{marginTop:"10px"}}> 
              <Typography color={"lightblue"}>
                Categories: {book.categories}
              </Typography>
        </Box>
        <Box>
          <Typography color={"white"}>
              Page Count: {book.pageCount}
          </Typography>
        </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BookDetails;
