import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3003/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const  result = await response.json();

      if (response.ok) {
        console.log("Logged in successfully!");
        console.log('User ID:', result.userId);

     // Store the userId in localStorage
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("username", formData.username); // Store the username

      // Fetch profile picture using the userId
     /* const picRes = await fetch(`http://localhost:3003/user/profile-picture/${result.userId}`);
      if (picRes.ok) {
        const picData = await picRes.json();
        const base64Image = `data:${picData.contentType};base64,${picData.data}`;
        localStorage.setItem("avatar", base64Image);
      } else {
        localStorage.removeItem("avatar"); // fallback if image not found
      }*/

      console.log(localStorage.avatar,"here it is ")


        setFormData({ username: "", password: "" });
        
        navigate('/'); // Redirect after login
      } else {
        console.log("Login failed.");
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during sign in.");
    }
  };

  return (
    <>
      <div className="report-form">
        <div className="bugtitle">
          <div>Sign In</div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="form-questions">Welcome Back to Bingr</h2>
        <form onSubmit={handleSubmit}>

          <div className="outer-input">
            <p className="form-questions">Username</p>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              className="bug-report-input"
              placeholder="Enter Your Username"
            />
          </div>

          <div className="outer-input">
            <p className="form-questions">Password</p>
            <input 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange}      
              className="bug-report-input"
              placeholder="Enter Your Password"
            />
          </div>

          <button className="submit-button" type="submit">Sign In</button>
        </form>

        <p style={{ marginTop: "10px", color: "white"}}>
          Don't have an account? <Link to="/register" style={{color: "red"}} >Register here</Link>
        </p>
      </div>
    </>
  );
}
