import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import dummyData from "./components/dummylist.json";
import './App.css';
import Navbar from "./components/Navbar";

/* Other pages */
import Home from "./pages/home";
import Books from "./pages/books";
import Movies from "./pages/movies";
import Games from "./pages/games";
import Profile from "./pages/profile";
import BugReport from "./pages/bugreport";
import SignIn from "./pages/signin";
import Register from "./pages/register";
/* End pages */

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(dummyData);
  }, []);

  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/games" element={<Games />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// NavbarWrapper component that handles conditional rendering
function NavbarWrapper() {
  const location = useLocation();
  
  if (location.pathname === '/signin' || location.pathname === '/register') {
    return null; // Don't render Navbar on SignIn or Register pages
  }

  return <Navbar />;
}

export default App;

