/*import React from "react";
import ProfilePictureUploader from "../components/profileIcon";
import BannerUploader from "../components/banner";



function Profile() {
  return (
    <div className="page-content">
      <h1>Profile Page</h1>
      <p>This is the profile page!</p>

      <BannerUploader/>
      <ProfilePictureUploader />
      
    </div>
  );
}

export default Profile;*/
import { useEffect, useState,query,setQuery } from "react";

import React from "react";
import "../App.css";
import EditButton from "../components/editProfile.js";
import PageButton from "../components/pageButton.js";
import FollowButton from "../components/followButton.js";
import banner from "../assets/images/Web_App_Bg_Transparent.png"
import avatar from "../assets/images/user-avatar.png"
import testimg from "../assets/movies_posters/28 Days Later (2002).png"
import ProfilePictureUploader from "../components/profileIcon";
import BannerUploader from "../components/banner";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



function Profile({ books,setBooks,maxResults=3}) {
  const defaultBanner = banner; // imported banner ima
  const [userBooks, setUserBooks] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [userDisplays, setUserDisplays] = useState([]);
  const [userProfilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
  const [userBanner, setBanner] = useState(localStorage.getItem('banner'));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const userId = localStorage.getItem("userId"); // instead of "username"
  const pagesUserId = useParams().id

useEffect(() => {
    async function grabUserName() {
      const res = await axios.get(`http://localhost:3003/user/username/${pagesUserId}`)
      console.log(res.data.data)
      if (res.status === 200) {
        setUsername(res.data.data)
      }
    }

    grabUserName()
  },[])
//console.log(userBanner,"hers banner")

//console.log(userProfilePic,"hers prof pic")

  //const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || usericon);
  useEffect(() => {
    async function fetchBannerImage() {
      try {
        
        const bannerRes = await fetch(`http://localhost:3003/user/profile-banner/${pagesUserId}`); // updates bannere
        //console.log(bannerRes)
        if (bannerRes.ok) {
          const bannerData = await bannerRes.json();
  
          const base64Image = `data:${bannerData.contentType};base64,${bannerData.data}`;
          setBanner(base64Image);
          //if(userId === pagesUserId){
            localStorage.setItem("banner", base64Image);
          //}


          if (bannerData && bannerData.data && bannerData.contentType) {
            const base64Image = `data:${bannerData.contentType};base64,${bannerData.data}`;
            setBanner(base64Image);
            localStorage.setItem("banner", base64Image);
         //   console.log(localStorage,"this is the storage!!1")
          } else {
            throw new Error("Invalid banner data");
          }
        } else {
          throw new Error("Banner not found");
        }
      } catch (error) {
        
        console.error("Failed to fetch banner image:", error);
        setBanner(banner); // fallback to default
      }
    }
  
    if (username && pagesUserId) {
      fetchBannerImage();
    } else {
      setBanner(banner); // fallback to default
    }
  }, [username, pagesUserId]);
  
     
useEffect(() => {
    async function fetchProfilePicture() {
      try {
        
        const pictureRes = await fetch(`http://localhost:3003/user/profile-picture/${pagesUserId}`); // updates profile picture
        //console.log(pictureRes)
        if (pictureRes.ok) {
          const pictureData = await pictureRes.json();
          const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
          setProfilePic(base64Image);
          //if(userId === pagesUserId){
            localStorage.setItem("avatar", base64Image);
          //}


          if (pictureData && pictureData.data && pictureData.contentType) {
            const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
            setProfilePic(base64Image);
            localStorage.setItem("avatar", base64Image);
         //   console.log(localStorage,"this is the storage!!1")
          } else {
            throw new Error("Invalid avatar data");
          }
        } else {
          throw new Error("Avatar not found");
        }
      } catch (error) {
        
        console.error("Failed to fetch avatar image:", error);
        setProfilePic(avatar); // fallback to default
      }
    }
  
    if (username && pagesUserId) {
      fetchProfilePicture();
    } else {
      setProfilePic(avatar); // fallback to default
    }
  }, [username, pagesUserId]);
  

  useEffect(() => {
    async function fetchDisplays() {
      try {
        const response = await fetch(`http://localhost:3003/user/display/${pagesUserId}`);
        const data = await response.json();

        setUserDisplays(data.data);
        //if(userId === pagesUserId){
          localStorage.setItem("displayboard", JSON.stringify(data.data))
          console.log(JSON.stringify(userDisplays))
        //}
      } catch (error) {
        console.error("Error fetching displays:", error);
      }
    };

    if (username && pagesUserId) {
      fetchDisplays();
    }
  }, [username, pagesUserId]);


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
  
  
  const API_URL = 'https://www.googleapis.com/books/v1/volumes';

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
  //console.log(username)



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
  //console.log(username)



  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://localhost:3003/${username}/games`);
        const data = await response.json();
        setUserGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    if (username) fetchGames();
  }, [username]);



function IsVisitor(){
    let params = useParams()
    //let testUser = getSingleUser(params.id)
    if(userId != params.id){
      return (
      <div>
        <FollowButton/>
        </div>
    )
    }else{
      return <EditButton/>
    }
  }



  return (
    <div className="profile-page">
      <div className="profile-banner">
      <img src={userBanner || banner} height="100%" width="100%" />
      </div>
      <div className="profile-user-container">
        <img src={userProfilePic|| avatar} height={150} width={150} style={{borderRadius: "50%", border: "15px solid #303030",}}/>
        
        <div className="profile-stats">
          <div className="media-type">
            <h1>Books</h1>
            <h1>Movies</h1>
            <h1>Games</h1>
          </div>
          <div className="amount-read">
            <h1>{userBooks.length}</h1>
            <h1>{userMovies.length}</h1>
            <h1>{userGames.length}</h1>
          </div>
        </div>
      </div>
    <div className="profile-details">
        <div className="edit-button-container">
                <div className="profile-name">
                    <h1>{username}</h1>
                  </div>
            </div>
      {IsVisitor()}
        <div className="profile-displayboard-container">
          {/*<div className="profile-displayboard">
            <img src={userDisplays[0].thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
          </div>
          <div className="profile-displayboard">
            <img src={userDisplays[1].thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
          </div>
          <div className="profile-displayboard">
            <img src={userDisplays[2].thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
          </div>*/}
          {userDisplays.length > 0 ? (
                    userDisplays.map((display, index) => (
                        <div className="profile-displayboard">
                            <img src={display.thumbnail} height='100%' width='100%' style={{borderRadius: "10%",}}></img>
                        </div>
                    ))
                    ) : (
                        <div className="profile-displayboard"></div>
                    )}
        </div>
    </div>
    <div className="profile-content">
  <h2>{username}'s Books</h2>
  <div className="profile-lists">
    {userBooks.length > 0 ? (
      userBooks.map((book, index) => (
        <Link
          key={book.id || index}
          to={`/book/${book.id}`}
          style={{ textDecoration: 'none' }}
        >
          {        console.log(book)}
          <div className="created-lists">
            <div className="list-thumbnail">
              <img id="profileImg" src={book.thumbnail} alt={book.title} />
            </div>
            <div className="list-details">
              <p id="book-title">{book.title}</p>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p>No books added yet.</p>
    )}
  </div>
  
  <h2>{username}'s Movies</h2>
<div className="profile-lists">
  {userMovies.length > 0 ? (
    userMovies.map((movie, index) => (
      <Link
        key={movie.id || index}
        to={`/movie/${movie.id}`}
        style={{ textDecoration: 'none' }}
      >
        <div className="created-lists">
          <div className="list-thumbnail">
            <img id="profileImg" src={movie.thumbnail} alt={movie.title} />
          </div>
          <div className="list-details">
            <p id="movie-title">{movie.title}</p>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <p>No movies added yet.</p>
  )}
  </div>

  <h2>{username}'s Games</h2>
<div className="profile-lists">
  {userGames.length > 0 ? (
    userGames.map((game, index) => (
      <Link
        key={game.id || index}
        to={`/game/${game.id}`}
        style={{ textDecoration: 'none' }}
      >
        <div className="created-lists">
          <div className="list-thumbnail">
            <img id="profileImg" src={game.thumbnail} alt={game.title} />
          </div>
          <div className="list-details">
            <p id="movie-title">{game.title}</p>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <p>No games added yet.</p>
  )}
  </div>


  <h1>Timeline</h1>
  <div className="profile-activity">
    <PageButton />
  </div>
</div>


  </div>
  );
}
  
  export default Profile;