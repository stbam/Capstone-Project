import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

import { Link } from 'react-router-dom';

function Recover() {
  const [email, setEmail] = useState("");

  // Handle input changes
  const handleChange = (e) => {
      setEmail(e.target.value);
  };

  return (
      <div>
          <div className="top-bar">
              <nav>
                  <Link to="/home" className="bingr">bingr</Link>
              </nav>
          </div>
          
          <div className="sign-in-page">  {/* This applies the background */}
              <div className="recover-form">
                  <div className="recover-title">
                      <h3>Reset Password</h3>
                  </div>

                  <div className="recover-content">
                      <label className="email-label"> 
                          <input
                              placeholder="Enter Email"
                              type="email"
                              name="email"
                              className="signin-input"
                              value={email}
                              onChange={handleChange}
                          />
                      </label>
                  </div>
                  <br/>
                  <div className="recover-content">
                      <Button className="custom-recover-contained"> SEND </Button>
                  </div>
                  
                
                  <div className="recover-content">
                      <p style={{ textAlign: "center", fontSize: "14px", marginTop: "20px", marginBottom: "10px" }}>
                          Have an account? <a href="/signin" style={{ textDecoration: "underline" }}>Sign In</a>
                      </p>
                  </div>

              
              </div>
          </div>
      </div>
  );
}

export default Recover;