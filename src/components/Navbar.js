import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import '../App.css';
import './Buttons'
import CustomButtons from "./Buttons";
import { Avatar } from "@mui/material";
import UserIcon from "./userIcon";
import AutocompleteSearchBar from '../components/SearchBar';

function Navbar({query,setQuery}) {
   /* const [query, setQuery] = useState("");*/
    const [results, setResults] = useState([]);
    return (
        <div>
            {/* Top Navbar : web logo, search bar, sign in, register, user profile */}
            <div className="top-bar">
            <div className="divider top-line"></div>
            <div className="divider bottom-line"></div>
                    <nav>
                        <Link to="/home" class="bingr">bingr</Link>
                    </nav>

                    <AutocompleteSearchBar query={query} setQuery={setQuery} />
                    <CustomButtons />
                    <UserIcon />
            </div>

            {/* Bottom Navbar: Links: Home, Books, Movies, Games, Bug Reporting, Discord */}
            <div className="under-bar">
                <div className="left-links">
                    <Link to="/home">Home</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/games">Games</Link>
                    <Link to="/discovery">Discover</Link>
                </div>
                <div className="right-links">
                    <Link to="bugreport">Bug Reporting</Link>
                    <a href="https://discord.gg/nCGYy8HC">Discord</a>
                   
                </div>
            </div>
        </div>

    );
  }
  
  export default Navbar;

  /*     <div>
            <div
                style={{
                backgroundColor: "#222222",
                height: "60px",
                width: "100%",
                position: "fixed",
                top: "0",
                left: "0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                zIndex: "999",
                }}
            >
                <nav>
                    <a href="" class="bingr">bingr</a>
                </nav>
            </div>
            <nav className="navbar">
                <div className="left-links">
                    <a href="">Home</a>
                    <a href="">Books</a>
                    <a href="">Movies</a>
                    <a href="">Games</a>
                </div>
            </nav>
                <nav className="navbar">
                    <div className="right-links">
                        <a href="">Bug Reporting</a>
                        <a href="https://discord.gg/nCGYy8HC">Discord</a>
                    </div>
                </nav>
        </div>
  */