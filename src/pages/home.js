import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import Carousel from "../components/carousel";
import ActionGames from "../components/ActionGames";
import HorrorGames from "../components/HorrorGames";
import AdventureGames from "../components/AdventureGames";
import CozyGames from "../components/CozyGames";
import HandDrawnGames from "../components/HandDrawnGames";
import SteamGameDetails from "../SteamGameDetails";
import SteamGameSearch from "../SteamGameSearch";

import Movies from "./movies";
import ImageGrid from '../components/imageGrid'

import arrow from "../assets/images/Arrow right-circle.png";
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function Home() {

    const categories = shuffleArray([
        { title: "Action", component: <ActionGames /> },
        { title: "Horror", component: <HorrorGames /> },
        { title: "Adventure", component: <AdventureGames /> },
        { title: "Cozy", component: <CozyGames /> },
        { title: "Hand-Drawn", component: <HandDrawnGames /> },
    ]);

    return (
        <div>
            <div className="page-content">
                <h1>Home</h1>
            </div>

            <div className="category">
                <div className="foryou-box">
                    <Carousel />
                </div>
            </div>

            <div className="page-content">
                <h1>Games</h1>
            </div>
            {categories.map(({ title, component }) => (
                <div className="category" key={title}>
                    <h2>{title}</h2>
                    <div className="foryou-box">
                        <div className="games-slider">{component}</div>
                    </div>
                </div>
            ))}

                <div className="see-more">

                    <Link to="/games">
                        <Button className="custom-contained">See More</Button>
                    </Link>
                </div>
            <div>
                <Movies/>
                <div className="see-more">
                    <Link to="/movies">
                        <Button className="custom-contained">See More</Button>
                    </Link>
                </div>

            </div>

            <div className="library-cards-subtitle">
            <div className="subtitle">
              <h1 style={{color:'white'}}>Books</h1>
              <h2 style={{margin:'24px',cursor:'pointer',color:'gray'}}><Link to="/books"id="grey-title" >See more <img src={arrow} style={{width:'15px',margin:'0px',cursor:'pointer'}} ></img></Link> </h2> {/* in line style meant to align the Home and See More */}
            </div>
            <div className="library-cards">
              <ImageGrid maxResults={4}></ImageGrid>
             
              
            </div>
          </div>
          
        </div>
    );
}

export default Home;
