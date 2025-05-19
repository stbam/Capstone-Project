import React, { useState ,useEffect} from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import '../App.css';
import banner from "../assets/images/Web_App_Bg_Transparent.png"; // Default banner image
import avatar from "../assets/images/user-avatar.png"; // Default avatar image

function EditPage() {
    const [userBooks, setUserBooks] = useState([]);
    const [userMovies, setUserMovies] = useState([]);
    let userDisplay = ["", "", ""]
    const [leftDisplayPreview, setLeftDisplayPreview] = useState(JSON.parse(localStorage.getItem('displayboard'))[0])
    const [middleDisplayPreview, setMiddleDisplayPreview] = useState(JSON.parse(localStorage.getItem('displayboard'))[1])
    const [rightDisplayPreview, setRightDisplayPreview] = useState(JSON.parse(localStorage.getItem('displayboard'))[2])
    const [userBanner, setBanner] = useState(banner); // Default banner set here
    const [bannerPreview, setBannerPreview] = useState(localStorage.getItem('banner'));
    const [userProfilePic, setProfilePic] = useState(avatar); // Default profile picture
    const [profilePicPreview, setProfilePicPreview] = useState(localStorage.getItem('avatar'));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const userId= localStorage.getItem('userId');

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await fetch(`http://localhost:3003/${username}/books`);
            const data = await response.json();
            setUserBooks(data);
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        };

        if (username) fetchBooks();
    }, [username]);
    
    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3003/${username}/movies`);
        const data = await response.json();
        setUserMovies(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (username) fetchMovies();
  }, [username]);

    const saveImagesToMongo = () => {
        const formData = new FormData();
        formData.append('profile_picture', userProfilePic);  // If using base64, you can send it directly
        //const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || usericon);
        formData.append('banner_image', userBanner);  // Same for the banner
        formData.append('left_displayboard', JSON.stringify(leftDisplayPreview));
        formData.append('middle_displayboard', JSON.stringify(middleDisplayPreview));
        formData.append('right_displayboard', JSON.stringify(rightDisplayPreview));
        formData.append('userId', userId);

      //  console.log(userBanner,"user banner");

        fetch("http://localhost:3003/user-banner", {
          method: "PUT",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Image update response:", data);
            console.log(formData,"here")
            window.location.reload()
          })
          .catch((err) => {
            
            console.log(err);
            console.error("Error updating images:", err);
          });
      };
      
      
    const VisuallyHiddenInput = styled('input')({
        height: 1,
        width: 1,
        overflow: 'hidden',
    });

    // Handle banner image upload
    function handleBannerUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file)); // Preview
        }
    }

    // Handle profile image upload
    function handleProfilePicUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file)); // Preview
        }
    }

    // Handle display upload for books
    function handleDisplayBooksUpload(board, index){
        const bookData = {
            boardID: board,
            media: "Book",
            title: userBooks[index].title,
            thumbnail: userBooks[index].thumbnail,
            id: userBooks[index].id
        }
         if(board === 1){
            userDisplay[0] = bookData
            setLeftDisplayPreview(bookData)
        }else if(board === 2){
            userDisplay[1] = bookData
            setMiddleDisplayPreview(bookData)
        }else{
            userDisplay[2] = bookData
            setRightDisplayPreview(bookData)
        }
        //setDisplayPreview(userDisplay)
        //console.log(displayPreview)
    }

    // Handle display upload for movies
    function handleDisplayMoviesUpload(board, index){
        const movieData = {
            boardID: board,
            media: "Movie",
            title: userMovies[index].title,
            thumbnail: userMovies[index].thumbnail,
            id: userMovies[index].id
        }
        if(board === 1){
            userDisplay[0] = movieData
            setLeftDisplayPreview(movieData)
        }else if(board === 2){
            userDisplay[1] = movieData
            setMiddleDisplayPreview(movieData)
        }else{
            userDisplay[2] = movieData
            setRightDisplayPreview(movieData)
        }
        //setDisplayPreview(userDisplay)
        //console.log(displayPreview)
    }

    return (
        <div className="edit-page-content">
            <div className="edit-incoming">
                <h1>Edit your profile</h1>
                <h3>Customize Profile Picture</h3>
                <div className="edit-button-container">
                    <Button className="edit-button-custom" component="label" role={undefined} variants="contained" tabIndex={-1}>
                        Upload Profile Image
                        <VisuallyHiddenInput type="file" onChange={handleProfilePicUpload} />
                    </Button>
                </div>
                <h3><br /><br />Customize Banner</h3>
                <div className="edit-button-container">
                    <Button className="edit-button-custom" component="label" role={undefined} variants="contained" tabIndex={-1}>
                        Upload Banner
                        <VisuallyHiddenInput type="file" onChange={handleBannerUpload} />
                    </Button>
                </div>
                <p style={{ fontSize: 15 }}>Recommended dimensions are 885 x 200</p>
                <h3><br /><br />Update Display Case</h3>
                <div className="display-button-container">
                    <div className="dropdown-container">
                        <Button className="dropdown-custom">Left Display</Button>
                        <div className="dropdown-custom-content">
                            <a>Favorite Books</a>
                            {userBooks.length > 0 ? (
                            userBooks.map((book, index) => (
                                <a onClick={() => handleDisplayBooksUpload(1, index)}>{book.title}</a>
                            ))
                            ) : 
                                    <a>No books favorited</a>
                            }
                            <a>Favorite Movies</a>
                            {userMovies.length > 0 ? (
                            userMovies.map((movie, index) => (
                                <a onClick={() => handleDisplayMoviesUpload(1, index)}>{movie.title}</a>
                            ))
                            ) : 
                                    <a>No movies favorited</a>
                            }
                        </div>
                    </div>
                   
                    <div className="dropdown-container">
                        <Button className="dropdown-custom">Middle Display</Button>
                        <div className="dropdown-custom-content">
                            <a>Favorite Books</a>
                            {userBooks.length > 0 ? (
                            userBooks.map((book, index) => (
                                <a onClick={() => handleDisplayBooksUpload(2, index)}>{book.title}</a>
                            ))
                            ) : 
                                    <a>No books favorited</a>
                            }
                            <a>Favorite Movies</a>
                            {userMovies.length > 0 ? (
                            userMovies.map((movie, index) => (
                                <a onClick={() => handleDisplayMoviesUpload(2, index)}>{movie.title}</a>
                            ))
                            ) : 
                                    <a>No movies favorited</a>
                            }
                        </div>
                    </div>

                    
                    <div className="dropdown-container">
                        <Button className="dropdown-custom">Right Display</Button>
                        <div className="dropdown-custom-content">
                            <a>Favorite Books</a>
                            {userBooks.length > 0 ? (
                            userBooks.map((book, index) => (
                                <a onClick={() => handleDisplayBooksUpload(3, index)}>{book.title}</a>
                            ))
                            ) : 
                                    <a>No books favorited</a>
                            }
                            <a>Favorite Movies</a>
                            {userMovies.length > 0 ? (
                            userMovies.map((movie, index) => (
                                <a onClick={() => handleDisplayMoviesUpload(3, index)}>{movie.title}</a>
                            ))
                            ) : 
                                    <a>No movies favorited</a>
                            }
                        </div>
                    </div>
                    
                </div>
                <div><Button onClick={saveImagesToMongo}>Submit</Button></div>
            </div>
            <div className="edit-examples">
                <div className="user-activity-icon">
                    {/* Profile image */}
                    <img src={profilePicPreview || userProfilePic} alt="Profile Picture" height={150} width={150} style={{ borderRadius: "50%" }} />
                </div>
                <div className="profile-banner">
                    {/* Banner image */}
                    <img src={bannerPreview || userBanner} alt="Profile Banner" height="75%" width="75%" style={{ paddingTop: "60px" }} />
                    {/* Hidden file input for banner upload */}
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleBannerUpload} />
                </div>
                <div className="profile-displayboard-container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
                    {leftDisplayPreview ? (
                    
                        <div className="profile-displayboard">
                            <img src={leftDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                        </div>
                    
                    ) : (
                        <div className="profile-displayboard">
                        </div>
                    )}
                    {middleDisplayPreview ? (
                        <div className="profile-displayboard">
                            <img src={middleDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                        </div>
                    
                    ) : (
                        <div className="profile-displayboard">
                        </div>
                    )}
                    {rightDisplayPreview ? (
                        <div className="profile-displayboard">
                            <img src={rightDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                        </div>
                    
                    ) : (
                        <div className="profile-displayboard">
                        </div>
                    )}
                    {/*<div className="profile-displayboard">
                        <img src={leftDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                    </div>
                    <div className="profile-displayboard">
                        <img src={middleDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                    </div>
                    <div className="profile-displayboard">
                        <img src={rightDisplayPreview.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}

export default EditPage;
