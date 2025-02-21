import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

import { Link } from 'react-router-dom';

function SignIn() {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="top-bar">
                <nav>
                    <Link to="/home" class="bingr">bingr</Link>
                </nav>
            </div>
            <div className="sign-in-page">  {/* This applies the background */}
                <div className="signin-form">
                    <div className="signin-title">
                        <h1>Sign In</h1>
                    </div>

                    <div className="signin-content">
                        <label> Username <br/>
                            <input
                                type="text"
                                name="username"
                                className="signin-input"
                                value={signInData.username}
                                onChange={handleChange}  // Make it controlled
                            />
                        </label>
                    </div>
                    <br/>
                    <div className="signin-content">
                        <label> Password <br/>
                            <input
                                type="password"  // Changed type to password for security
                                name="password"
                                className="signin-input"
                                value={signInData.password}  // Make it controlled
                                onChange={handleChange}  // Make it controlled
                            />
                        </label>
                    </div>
                    <br/>
                    <div className="signin-content">
                        <Button className="custom-signin-contained">Sign In</Button>
                    </div>
                    
                    {/* Registration prompt on the sign in page */}
                    <div className="signin-content">
                        <p style={{ textAlign: "center", fontSize: "14px", marginTop: "20px", marginBottom: "10px" }}>
                            Don't have an account? <a href="/register" style={{ textDecoration: "underline" }}>Register</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default SignIn;
