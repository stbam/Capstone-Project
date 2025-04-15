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
import testimg from "../assets/movies_posters/28 Days Later (2002).png"
import ProfilePictureUploader from "../components/profileIcon";
import BannerUploader from "../components/banner";
import { Link } from "react-router-dom";



function Profile({ books,setBooks,maxResults=3}) {
  const defaultBanner = banner; // imported banner ima
  const [userBooks, setUserBooks] = useState([]);
  const [userProfilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
  const [userBanner, setBanner] = useState(localStorage.getItem('banner'));
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId"); // instead of "username"


  console.log(username);
//console.log(userBanner,"hers banner")

//console.log(userProfilePic,"hers prof pic")

  //const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || usericon);
  useEffect(() => {
    async function fetchBannerImage() {
      try {
        
        const bannerRes = await fetch(`http://localhost:3003/user/profile-banner/${userId}`); // updates bannere
        //console.log(bannerRes)
        if (bannerRes.ok) {
          const bannerData = await bannerRes.json();
  
          const base64Image = `data:${bannerData.contentType};base64,${bannerData.data}`;
          setBanner(base64Image);
          localStorage.setItem("banner", base64Image);


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
  
    if (username && userId) {
      fetchBannerImage();
    } else {
      setBanner(banner); // fallback to default
    }
  }, [username, userId]);
  
     

  


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









  return (
    <div className="profile-page">
      <div className="profile-banner">
      <img src={userBanner || banner} height="100%" width="100%" />
      </div>
      <div className="profile-user-container">
        <img src={userProfilePic|| "https://avatars.githubusercontent.com/u/19550456"} height={150} width={150} style={{borderRadius: "50%", border: "15px solid #303030",}}/>
        
        <div className="profile-stats">
          <div className="media-type">
            <h1>Books</h1>
            <h1>Movies</h1>
            {/*<h1>Shows</h1>*/}
            <h1>Games</h1>
          </div>
          <div className="amount-read">
            <h1>23</h1>
            <h1>46</h1>
            {/*<h1>11</h1>*/}
            <h1>58</h1>
          </div>
        </div>
      </div>
    <div className="profile-details">
        <FollowButton></FollowButton>
        <EditButton></EditButton>
        <div className="profile-displayboard-container">
          <div className="profile-displayboard"><img src={testimg} height='100%' width='100%' style={{borderRadius: "10%",}}></img></div>
          <div className="profile-displayboard"></div>
          <div className="profile-displayboard"></div>
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

  <h1>Timeline</h1>
  <div className="profile-activity">
    <PageButton />
  </div>
</div>


  </div>
  );
}
  
  export default Profile;