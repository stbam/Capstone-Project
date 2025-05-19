import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import '../App.css';
import './Buttons';
import CustomButtons from "./Buttons";
import UserIcon from "./userIcon";
import AutocompleteSearchBar from './SearchBar';

function Navbar({ query, setQuery }) {
  const location = useLocation();

  const tabPaths = ["/home", "/books", "/movies", "/games", "/bugreport"];
  const currentTab = tabPaths.includes(location.pathname) ? tabPaths.indexOf(location.pathname) : false;

  return (
    <div className="whole-bar">
      {/* Top Navbar */}
      <div className="top-bar">
        <div className="divider top-line"></div>
        <div className="divider bottom-line"></div>
        <nav>
          <Link to="/home" className="bingr">bingr</Link>
        </nav>
        <AutocompleteSearchBar query={query} setQuery={setQuery} />
        <CustomButtons />
        <UserIcon />
      </div>

      {/* Bottom Navbar Styled as Tabs */}
      <div className="under-bar">
        <div className="left-links">
          <Tabs value={currentTab} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: "#000" } }}>
            <Tab label="Home" component={Link} to="/home" className="tab-link" />
            <Tab label="Books" component={Link} to="/books" className="tab-link" />
            <Tab label="Movies" component={Link} to="/movies" className="tab-link" />
            <Tab label="Games" component={Link} to="/games" className="tab-link" />
            <Tab label="Discover" component={Link} to="/discovery" className="tab-link" />
          </Tabs>
        </div>
        <div className="right-links">
          <Tabs value={location.pathname === "/bugreport" ? 0 : false} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: "#000" } }}>
            <Tab label="Bug Reporting" component={Link} to="/bugreport" className="tab-link" />
            <Tab label="Discord" component="a" href="https://discord.gg/nCGYy8HC" target="_blank" className="tab-link" />
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
