import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
    

    
      // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "email") setEmail(value);
      else if (name === "username") setUsername(value);
      else if (name === "password") setPassword(value);
      else if (name === "age") setAge(value);
      else if (name === "gender") setGender(value);
      else if (name === "location") setLocation(value);
    };

    return (
      <div>
          <div className="top-bar">
              <nav>
                  <Link to="/home" className="bingr">bingr</Link>
              </nav>
          </div>
          
          <div className="sign-in-page">  {/* This applies the background */}
              <div className="register-form">
                  <div className="recover-title">
                      <h2>Register</h2>
               </div>

               <div className="recover-content">
                      <label className="register-label"> 
                          <input
                              placeholder="Enter Username"
                              type="text"
                              name="username"
                              className="signin-input"
                              value={username}
                              onChange={handleChange}
                          />
                      </label>
                  </div>

                  <div className="recover-content">
                      <label className="register-label"> 
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

                  <div className="recover-content">
                      <label className="register-label"> 
                          <input
                              placeholder="Enter Password"
                              type="text"
                              name="password"
                              className="signin-input"
                              value={password}
                              onChange={handleChange}
                          />
                      </label>
                  </div>

                  <div className="recover-content">
                      <label className="register-label"> 
                          <input
                              placeholder="Enter Age"
                              type="text"
                              name="age"
                              className="signin-input"
                              value={age}
                              onChange={handleChange}
                          />
                      </label>
                  </div>

                  <div className="recover-content">
                      <label className="register-label"> 
                          <input
                              placeholder="Enter Location"
                              type="text"
                              name="location"
                              className="signin-input"
                              value={location}
                              onChange={handleChange}
                          />
                      </label>
                  </div>

                  <div className="gender">
                      <label> Gender: </label>
                      <input type="radio" value="Male" name="gender" defaultChecked /> Male  
                      <input type="radio" value="Female" name="gender" /> Female  
                      <input type="radio" value="Other" name="gender" /> Other 
                      
                  </div>
                  
                  <br/>

                  <div className="recover-content">
                      <Button className="custom-register-contained"> SUBMIT </Button>
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
  
  export default Register;