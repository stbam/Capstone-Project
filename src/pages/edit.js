import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import '../App.css';
import banner from "../assets/images/Web_App_Bg_Transparent.png"; // Default banner image
import avatar from "../assets/images/user-avatar.png"; // Default avatar image

function EditPage() {
    const [userBanner, setBanner] = useState(banner); // Default banner set here
    const [userProfilePic, setProfilePic] = useState(avatar); // Default profile picture

    const [bannerPreview, setBannerPreview] = useState(banner);
const [profilePicPreview, setProfilePicPreview] = useState(avatar);

    const userId= localStorage.getItem('userId');

    const saveImagesToMongo = () => {
        const formData = new FormData();
        formData.append('profile_picture', userProfilePic);  // If using base64, you can send it directly
        formData.append('banner_image', userBanner);  // Same for the banner
        formData.append('userId', userId);
        
   console.log(userBanner);

        fetch("http://localhost:3003/user-banner", {
          method: "PUT",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Image update response:", data);
            console.log(formData,"here")
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
                            <a>Favorites</a>
                        </div>
                    </div>
                   
                    <div className="dropdown-container">
                        <Button className="dropdown-custom">Middle Display</Button>
                        <div className="dropdown-custom-content">
                            <a>Favorites</a>
                        </div>
                    </div>

                    
                    <div className="dropdown-container">
                        <Button className="dropdown-custom">Right Display</Button>
                        <div className="dropdown-custom-content">
                            <a>Favorites</a>
                        </div>
                    </div>
                    
                </div>
                <div><Button onClick={saveImagesToMongo}>Submit</Button></div>
            </div>
            <div className="edit-examples">
                <div className="user-activity-icon">
                    {/* Profile image */}
                    <img src={profilePicPreview} alt="Profile Picture" height={150} width={150} style={{ borderRadius: "50%" }} />
                </div>
                <div className="profile-banner">
                    {/* Banner image */}
                    <img src={bannerPreview} alt="Profile Banner" height="75%" width="75%" style={{ paddingTop: "60px" }} />
                    {/* Hidden file input for banner upload */}
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleBannerUpload} />
                </div>
                <div className="profile-displayboard-container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
                    <div className="profile-displayboard"></div>
                    <div className="profile-displayboard"></div>
                    <div className="profile-displayboard"></div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
