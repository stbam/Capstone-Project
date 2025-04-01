import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";  // Import useNavigate


import React, { useState } from "react";

export default function BasicForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

  });
  const navigate = useNavigate();  // Initialize the navigate function

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
  
    try {
      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // ✅ Ensure JSON is sent
        },
        body: JSON.stringify(data),  // ✅ Convert object to JSON
      });
  
      if (response.ok) {
        console.log("Form submitted successfully!");
        
        setFormData({ name: "", email: "", password: "" });
        navigate('/'); // Redirect to the homepage
      } else {
        console.log("Error frontend");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  

  return (
    <>
      <div className="report-form">
        <div className="bugtitle">
          <div>Register</div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="form-questions">Welcome to Bingr</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="outer-input">
            <p id="title-label" className="form-questions">Name</p>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="bug-report-input"
              list="title-suggestions" // Link to the datalist
              placeholder="Title of the issue"
            />
            <datalist id="title-suggestions">
              <option value="Bug in Login" />
              <option value="Page Not Found" />
              <option value="Feature Request" />
              <option value="Performance Issue" />
            </datalist>
          </div>


          <div className="outer-input">
            <p id="description-label" className="form-questions">Email</p>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
               
              className="bug-report-input"
              placeholder="Enter Your Email"
            
            />
          </div>


          <div className="outer-input">
            <p id="description-label" className="form-questions">Password</p>
            <input 
              
              name="password" 
              type="text" 
              value={formData.password} 
              onChange={handleChange}      
              className="bug-report-input"
              placeholder="Password"
             
            />
          </div>


          <button className="submit-button" type="submit">Sign Up</button>
        </form>

    
      </div>
    </>
  );
}