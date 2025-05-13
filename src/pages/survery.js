import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import genres from "../movieGenres";
import movieimg from "../assets/images/cinema.png";
import axios from "axios";

export default function OnboardingSurvey() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [movieLength, setMovieLength] = useState("");
  const [period, setPeriod] = useState("");
  const [tryNew, setTryNew] = useState("");

useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user ID found. Please sign in first.");
    window.location.href = "/signin";
  }
}, []);

const [activeCard, setActiveCard] = useState(0);

  const toggleSelection = (value, setFunction, stateArray) => {
    setFunction(
      stateArray.includes(value)
        ? stateArray.filter((item) => item !== value)
        : [...stateArray, value]
    );
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

  // 🔒 Validation: Ensure all required fields are filled
  if (
    selectedMedia.length === 0 ||
    selectedGenres.length === 0 ||
    !preferredLanguage ||
    !movieLength ||
    !period ||
    !tryNew
  ) {
    alert("Please complete all questions before submitting.");
    return;
  }

    const surveyData = {
      selectedMedia: selectedMedia,
      selectedGenres: selectedGenres,
      preferred_language: preferredLanguage,
      movie_length: movieLength,
      period: period,
      try_new: tryNew,
    };

    try {
      const response = await axios.put(
        `http://localhost:3003/user/survey/${userId}`,
        surveyData
      );
      console.log("Survey submitted:", response.data);
      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey.");
    }
  };

  const cards = [
    {
      id: 0,
      title: "What do you want recommendations for?",
      image: movieimg,
      options: ["Movies"],
      type: "multi",
      handler: (val) => toggleSelection(val, setSelectedMedia, selectedMedia),
      state: selectedMedia,
    },
    {
      id: 1,
      title: "What movie genres do you most enjoy?",
      image: movieimg,
      options: genres.map((g) => g.name),
      type: "multi",
      handler: (val) => toggleSelection(val, setSelectedGenres, selectedGenres),
      state: selectedGenres,
    },
    {
      id: 2,
      title: "What is your preferred language?",
      options: [
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
      ],
      type: "single",
      handler: setPreferredLanguage,
      state: preferredLanguage,
    },
    {
      id: 3,
      title: "What is your preferred movie length?",
      options: [
        "Less than 90 minutes",
        "90-120 minutes",
        "120-150 minutes",
        "Over 150 minutes",
        "No preference",
      ],
      type: "single",
      handler: setMovieLength,
      state: movieLength,
    },
    {
      id: 4,
      title: "Do you prefer movies from a certain time period?",
      options: [
        "Before 1970",
        "1970-1980",
        "1990-2000",
        "2010-2020",
        "2020+",
        "No preference",
      ],
      type: "single",
      handler: setPeriod,
      state: period,
    },
    {
      id: 5,
      title: "How often do you try something new?",
      options: [
        "All the time — I’m always exploring",
        "Sometimes — if it looks interesting",
        "Rarely — I stick with what I know",
        "Never — please just show me safe picks",
      ],
      type: "single",
      handler: setTryNew,
      state: tryNew,
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
          minHeight: "calc(100vh - 80px)",
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
                  <Card className="card-dark">
                    {card.image && (
                      <img src={card.image} alt="Card Icon" className="card-icon" />
                    )}
                    <CardContent className="p-4 grid gap-4">
                      <h2 className="text-xl font-semibold">{card.title}</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {card.options.map((option) => (
                          <Button
                            key={option}
                            variant={
                              card.type === "multi"
                                ? card.state.includes(option)
                                  ? "contained"
                                  : "outlined"
                                : card.state === option
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() =>
                              card.type === "multi"
                                ? card.handler(option)
                                : card.handler(option)
                            }
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      <div className="navigation-buttons" style={{ marginTop: "-150px" }}>
        <Button
          onClick={handlePrevious}
          disabled={activeCard === 0}
          variant="outlined"
          style={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        {activeCard === cards.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}