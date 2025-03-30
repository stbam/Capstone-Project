import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import '../App.css';
import banner from "../assets/images/Web_App_Bg_Transparent.png"

function EditPage(){
    const [userBanner, setBanner] = useState(null);
    const VisuallyHiddenInput = styled('input')({
        height: 1,
        width: 1,
        overflow: 'hidden',
    });
    function handleUpload(event){
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return(
        <div className="edit-page-content">
            <div className="edit-incoming">
                <h1>Edit your profile</h1>
                <h3>Customize Profile Picture</h3>
                <div className="edit-button-container">
                    <Button className="edit-button-custom" component="label" role={undefined} variants="contained" tabIndex={-1}>
                        Upload Image<VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => console.log(event.target.files)} />
                    </Button>
                </div>
                <h3><br></br><br></br>Customize Banner</h3>
                <div className="edit-button-container">
                    <Button className="edit-button-custom" component="label" role={undefined} variants="contained" tabIndex={-1}>
                        Upload Banner<VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => console.log(event.target.files)} />
                    </Button>
                </div>
                <p style={{fontSize:15}}>recommemded dimmensions are 885 x 200</p>
                <h3><br></br><br></br>Update Display Case</h3>
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
            </div>
            <div className="edit-examples">
                <div className="user-activity-icon">
                        <img src="https://avatars.githubusercontent.com/u/19550456" height={150} width={150} style={{borderRadius: "50%",}}/>
                </div>
                <div className="profile-banner">
                    {/*<label htmlFor="banner-upload">*/}
                        <img src={banner} height='75%' width='75%' style={{paddingTop: "60px",}}></img>
                    {/*</label>*/}
                </div>
                <div className="profile-displayboard-container" style={{paddingTop: "100px",paddingBottom: "60px",}}>
                    <div className="profile-displayboard"></div>
                    <div className="profile-displayboard"></div>
                    <div className="profile-displayboard"></div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;