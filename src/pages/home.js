import React, {useState} from "react";
import Carousel from "../components/carousel";
import ActionGames from "../components/ActionGames";
import HorrorGames from "../components/HorrorGames";
import AdventureGames from "../components/AdventureGames";
import CozyGames from "../components/CozyGames";
import HandDrawnGames from "../components/HandDrawnGames";
import SteamGameDetails from "../SteamGameDetails";
import SteamGameSearch from "../SteamGameSearch";

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

            {categories.map(({ title, component }) => (
                <div className="category" key={title}>
                    <h2>{title}</h2>
                    <div className="foryou-box">
                        <div className="actiongames-slider">{component}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
