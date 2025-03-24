import React from "react";
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

export default Profile;