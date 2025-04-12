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
  const [userProfilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
  const [userBanner, setBanner] = useState(localStorage.getItem('banner'));
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId"); // instead of "username"


  
console.log(userBanner,"hers banner")



  //const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || usericon);

 /* useEffect(() => {
  async function fetchBannerImage() {
    // If there's already a banner in localStorage, use it
    if (localStorage.getItem('banner')) {
      setBanner(localStorage.getItem('banner'));
      return;
    } try {
      // Fetch banner from server
      const bannerRes = await fetch(`http://localhost:3003/user/banner-image/${userId}`);
      console.log(bannerRes,"here is banner ");
      if (bannerRes.ok) {
        const bannerData = await bannerRes.json();
        const base64Image = `data:${bannerData.contentType};base64,${bannerData.data}`;
        setBanner(base64Image);
        localStorage.setItem("banner", base64Image);
      } else {
        // If fetch fails, use default banner
        localStorage.removeItem("banner");
        setBanner(banner); // Set default
      }
    } catch (error) {
      console.error("Failed to fetch banner image:", error);
      setBanner(banner); // Set default if fetch fails
    }
  }
  // Only fetch banner image if username is available
  if (username) {
    fetchBannerImage();
  } else {
    // Fallback to default banner if username is not found
    setBanner(banner);
  }
}, [username, userId]);*/


  


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