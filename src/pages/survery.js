import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { motion, AnimatePresence } from "framer-motion";
import steamTags from "../steamTags";
import genres from "../movieGenres";

import movieimg from "../assets/images/cinema.png";
import gameimg from "../assets/images/computer-game.png";
import bookimg from "../assets/images/reading-book.png";

export default function OnboardingSurvey() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [favorites, setFavorites] = useState("");
  const [discovery, setDiscovery] = useState("");
  const [activeCard, setActiveCard] = useState(0); // Track the currently visible card

  const toggleSelection = (value, setFunction, stateArray) => {
    setFunction(
      stateArray.includes(value)
        ? stateArray.filter((item) => item !== value)
        : [...stateArray, value]
    );
  };

  const handleSubmit = () => {
    const surveyData = {
      selectedMedia,
      selectedGenres,
      favorites,
      discovery,
    };
    console.log("Survey submitted:", surveyData);
    // Here, you'd send it to your backend
  };

  const cards = [
    {
      id: 0,
      content: (
        <Card className="card-dark">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">What do you want recommendations for?</h2>
            <div className="option-card-container">
              {[
                { name: "Movies", img: movieimg },
              ].map((media) => (
                <motion.div
                  key={media.name}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 10,
                    rotateY: 10,
                  }}
                  whileTap={{
                    scale: 0.95,
                    rotateX: -10,
                    rotateY: -10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 50,
                  }}
                >
                  <Card
                    className={`option-card ${
                      selectedMedia.includes(media.name) ? "selected" : ""
                    }`}
                    onClick={() =>
                      toggleSelection(media.name, setSelectedMedia, selectedMedia)
                    }
                  >
                    <CardContent>
                      <img src={media.img} alt={media.name} />
                      <p>{media.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 1,
      content: (
        <Card className="card-dark">
          {/* Add the image in the top-right corner */}
          <img
            src={movieimg}
            alt="Card Icon"
            className="card-icon"
          />
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-xl font-semibold">What movie genres do you most enjoy?</h2>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant={
                    selectedGenres.includes(genre.name)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    toggleSelection(
                      genre.name,
                      setSelectedGenres,
                      selectedGenres
                    )
                  }
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 2,
      content: (
        <Card className="card-dark">
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-xl font-semibold">What is your preferred language?</h2>
            {[
              "English",
              "Spanish",
              "French",
              "German",
              "Chinese",
              "Japanese",
              "Korean",
              "Russian",
              "Italian",
              "Portuguese",
            ].map((option) => (
              <Button
                key={option}
                variant={discovery === option ? "contained" : "outlined"}
                onClick={() => setDiscovery(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 3,
      content: (
        <Card className="card-dark">
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-xl font-semibold">What is your preferred movie length?</h2>
            {[
              "Less than 90 minutes",
              "90-120 minutes",
              "120-150 minutes",
              "Over 150 minutes",
              "No preference",
            ].map((option) => (
              <Button
                key={option}
                variant={discovery === option ? "contained" : "outlined"}
                onClick={() => setDiscovery(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 4,
      content: (
        <Card className="card-dark">
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-xl font-semibold">Do you prefer movies from a certain time period?</h2>
            {[
              "Before 1970",
              "1970-1980",
              "1990-2000",
              "2010-2020",
              "2020+",
              "No preference",
            ].map((option) => (
              <Button
                key={option}
                variant={discovery === option ? "contained" : "outlined"}
                onClick={() => setDiscovery(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 5,
      content: (
        <Card className="card-dark">
          <CardContent className="p-4 grid gap-4">
            <h2 className="text-xl font-semibold">How often do you try something new?</h2>
            {[
              "All the time — I’m always exploring",
              "Sometimes — if it looks interesting",
              "Rarely — I stick with what I know",
              "Never — please just show me safe picks",
            ].map((option) => (
              <Button
                key={option}
                variant={discovery === option ? "contained" : "outlined"}
                onClick={() => setDiscovery(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      ),
    },
  ];

  const handleNext = () => {
    if (activeCard < cards.length - 1) {
      setActiveCard((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeCard > 0) {
      setActiveCard((prev) => prev - 1);
    }
  };

  return (
    <div
      className="page-content"
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
      }}
    >
      <motion.div
        className="max-w-xl mx-auto"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)", // Subtract navbar height to center cards
        }}
      >
        <AnimatePresence mode="wait">
          {cards.map(
            (card) =>
              card.id === activeCard && (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="card-container"
                >
                  {card.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons" style={{ marginTop: "-150px" }}>
        <Button
          onClick={handlePrevious}
          disabled={activeCard === 0}
          variant="outlined"
          style={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeCard === cards.length - 1}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
}