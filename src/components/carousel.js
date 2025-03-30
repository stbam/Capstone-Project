import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../App.css";
import { useGamesData } from "../pages/games";

function Carousel({ genre }) {
  const { gamesByGenre, isLoading } = useGamesData(); // Access games data
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    console.log("gamesByGenre:", gamesByGenre); // Debugging: Log gamesByGenre
    if (gamesByGenre[genre]?.length > 0) {
      setCurrentGame(gamesByGenre[genre][0]); // Set the first game as the default
    }
  }, [gamesByGenre, genre]);

  if (isLoading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  if (!gamesByGenre[genre] || gamesByGenre[genre].length === 0) {
    return <p style={{ color: "white" }}>No games available for {genre}.</p>;
  }

  return (
    <div>
      {/* Display game details */}
      {currentGame && (
        <div className="details-box">
          <img
            src={currentGame.header_image || "default_image_url"} // Ensure the image is displayed
            alt={currentGame.name}
            style={{ width: "100%" }}
          />
          <h2 style={{ color: "#b65bd9", textAlign: "left", marginLeft: 14, fontSize: 18 }}>
            {currentGame.name}
          </h2>
          <p 
          style={{ color: "white", marginLeft: 14, fontSize: 14 }}>
          {currentGame.appid || "No appid."}
          </p>
          <p style={{ color: "white", marginLeft: 14, fontSize: 14 }}>
            {currentGame.short_description || "No description available."}
          </p>
          <p style={{ color: "white", marginLeft: 14, fontSize: 14 }}>
            {currentGame.price_overview || "No price available."}
          </p>
          <p style={{ color: "white", marginLeft: 14, fontSize: 14 }}>
            {currentGame.developers?.join(", ") || "No developers available."}
          </p>
          <p style={{ color: "white", marginLeft: 14, fontSize: 14 }}>
            {currentGame.publishers?.join(", ") || "No publishers available."}
          </p>
        </div>
      )}

      {/* Swiper carousel */}
      <Swiper
        className="game-carousel"
        modules={[Navigation, Pagination, EffectCoverflow]}
        loop={true}
        spaceBetween={50}
        slidesPerView={1} // Show one slide at a time
        navigation
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          depth: 200,
        }}
        onSlideChange={(swiper) => setCurrentGame(gamesByGenre[genre][swiper.realIndex])} // Update the current game on slide change
      >
        {gamesByGenre[genre].map((game, index) => (
          <SwiperSlide className="game-carousel-slide" key={game.id || index}>
  <img
    src={game.header_image || "default_image_url"}
    alt=""
    style={{ borderRadius: "8px", width: "100%" }}
  />
  {/* REMOVE this line if it's present */}
  {/* <p>{game.name}</p> */}
</SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
