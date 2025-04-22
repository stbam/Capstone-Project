import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";  // Import useNavigate
import React, { useState } from "react";

export default function BasicForm() {
  const [formData, setFormData] = useState({
    username: "",  // Changed 'name' to 'username'
    email: "",
    password: "",
    age:"",
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
      username: formData.username,  // Changed 'name' to 'username'
      email: formData.email,
      password: formData.password,
      age: formData.age,
    };

    try {
      const response = await fetch("http://localhost:3003/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // ✅ Ensure JSON is sent
        },
        body: JSON.stringify(data),  // ✅ Convert object to JSON
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setFormData({ username: "", email: "", password: "", age: "" });
        navigate('/signin'); // Redirect to sign in page
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
        <div style={{ fontSize: "36px", paddingTop: "15px", marginBottom: "15px" }}>Create Your Account</div>
      </div>
      </div>

      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
          
          <div className="outer-input">
            <p id="title-label" className="form-questions">Username</p>  {/* Changed from "Name" to "Username" */}
            <input 
              type="text" 
              name="username"  
              value={formData.username} 
              onChange={handleChange} 
              className="bug-report-input"
              placeholder="Enter your username"
            />
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
              type="password" 
              value={formData.password} 
              onChange={handleChange}      
              className="bug-report-input"
              placeholder="Password"
            />
          </div>

          <div className="outer-input">
            <p id="description-label" className="form-questions">Age</p>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              className="bug-report-input"
              placeholder="Age"
            />
          </div>

          <button className="submit-button" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
