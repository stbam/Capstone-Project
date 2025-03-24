import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import usericon from '../assets/images/user-avatar.png';
import '../App.css';

function UserIcon(){
    return(
        <div className="avatar-container">
            <Link to="/profile">
                <Avatar src={usericon} style={{cursor: "pointer"}} />
            </Link>

        </div>
    );
}
export default UserIcon;