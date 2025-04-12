import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import usericon from '../assets/images/user-avatar.png';
import '../App.css';

function UserIcon() {
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || usericon);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
   // console.log(userId);

    //console.log("trigger")

    useEffect(() => {
        if (!username) {
            setAvatar(usericon); // Fallback to default avatar
            return;  // Exit early, no need to fetch image
        }


        async function fetchProfilePic() {
            try {
                const picRes = await fetch(`http://localhost:3003/user/profile-picture/${userId}`);
                
                if (picRes.ok) {
                    const picData = await picRes.json();
                    const base64Image = `data:${picData.contentType};base64,${picData.data}`;
                    setAvatar(base64Image);
                    localStorage.setItem("avatar", base64Image);
                } else {
                    localStorage.removeItem("avatar");
                    setAvatar(usericon); // fallback to default avatar
                }
            } catch (error) {
                console.error("Failed to fetch profile image:", error);
                setAvatar(usericon); // fallback to default avatar on error
            }
        }

        if (userId) {
            fetchProfilePic();
        } else {
            setAvatar(usericon); // if no user, show default
        }
    }, [userId]);

    return (
        <div className="avatar-container">
            <Link to="/profile">
                <Avatar src={avatar} style={{ cursor: "pointer" }} />
            </Link>
        </div>
    );
}

export default UserIcon;
