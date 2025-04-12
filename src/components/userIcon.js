import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import usericon from '../assets/images/user-avatar.png';
import '../App.css';

function UserIcon(){
    const [avatar, setAvatar] =  useState(localStorage.getItem('avatar')); // Get username from localStorage on initial load
    return(
        <div className="avatar-container">
            <Link to="/profile">
                <Avatar src={avatar} style={{cursor: "pointer"}} />
            </Link>

        </div>
    );
}
export default UserIcon;