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
import { useEffect, useState } from "react";

import React from "react";
import "../App.css";
import EditButton from "../components/editProfile.js";
import PageButton from "../components/pageButton.js";
import FollowButton from "../components/followButton.js";
import banner from "../assets/images/Web_App_Bg_Transparent.png"
import testimg from "../assets/movies_posters/28 Days Later (2002).png"
import ProfilePictureUploader from "../components/profileIcon";
import BannerUploader from "../components/banner";


function Profile() {
  const [userBooks, setUserBooks] = useState([]);
  const [userProfilePic, setProfilePic] = useState(null);
  const [userBanner, setBanner] = useState(null);
  const username = localStorage.getItem("username");


  


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
  console.log(username)


  return (
    <div className="profile-page">
      <div className="profile-banner">
        <img src={banner} height='100%' width='100%'></img>
      </div>
      <div className="profile-user-container">
        <img src="https://avatars.githubusercontent.com/u/19550456" height={150} width={150} style={{borderRadius: "50%", border: "15px solid #303030",}}/>
        
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
                  <div className="created-lists" key={index}>
                    <div className="list-thumbnail">
                      <img id="profileImg" src={book.thumbnail} alt={book.title} />
                    </div>
                    <div className="list-details">
                      <p>{book.title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books added yet.</p>
              )}
        </div>

      <h1>Timeline</h1>
      <div className="profile-activity">
        <PageButton></PageButton>
      </div>
    </div>
  </div>
  );
}
  
  export default Profile;