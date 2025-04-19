import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import '../App.css'

function CustomButtons(){
    const [username, setUsername] = useState(localStorage.getItem('username')); // Get username from localStorage on initial load

    return (
       <div className="buttons-container">
            {/* If username exists in localStorage, show the username */}
            {username ? (
                <>
                    <h2 className="custom-heading" >{username}</h2>
                  <Link>  <Button
                        className="custom-outlined"
                        onClick={() => {
                            // Remove username from localStorage and reload page to reflect changes
                            localStorage.removeItem('username');
                            localStorage.removeItem('avatar');
                            
                            setUsername(null);  // Clear the username from state
                            window.location.reload();
                          
                        }}

                        sx={{
                            position: 'relative', // Make the button position relative
                            top: '2px', // Apply top positioning
                        }}
                   
                    >
                        Log Out
                    </Button> </Link> 
                </>
            ) : (
                // If no username in localStorage, show Sign In and Register buttons
                <>
                    <Link to="/signin">
                        <Button className="custom-contained">Sign In</Button>
                    </Link>

                    <Link to="/register">
                        <Button className="custom-outlined">Register</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
export default CustomButtons;