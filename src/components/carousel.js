import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../App.css"; 

import img1 from "../assets/test_images/shheader.jpg";
import img2 from "../assets/test_images/wfheader.jpg";
import img3 from "../assets/test_images/mwheader.jpg";
import img4 from "../assets/test_images/csheader.jpg";
import img5 from "../assets/test_images/cotlheader.jpg";

function Carousel() {
    /* This would be replaced with a data base */
    const games = [
      { title: "Webfishing", developer: "Webfishing developer", publisher: "Webfishing publisher", rating: "Overwhelmingly Positive", ratingCount: "23,031", info: "Webfishing Game Info", img: img1 },
      { title: "Mouthwashing", developer: "Mouthwashing developer", publisher: "Mouthwashing publisher", rating: "Positive", ratingCount: "10,351", info: "Mouthwashing Game Info",img: img2 },
      { title: "Cruelty Squad", developer: "Cruelty Squad developer", publisher: "Cruelty Squad publisher", rating: "Positive", ratingCount: "12,111", info:"Cruelty Squad Game Info" ,img: img3 },
      { title: "Cult of the Lamb", developer: "Cult of the Lamb developer", publisher: "Cult of the Lamb publisher", rating: "Overwhelmingly Positive", ratingCount: "14,500", info:"Cult of the Lamb Game Info", img: img4 },
      { title: "Silent Hill 2", developer: "Silent Hill 2 developer", publisher: "Silent Hill 2 publisher", rating: "Positive", ratingCount: "8,491", info: "Silent Hill 2 Game Info",img: img5 },
    ];
  
    const [currentGame, setCurrentGame] = useState(games[0]); // Start with the first game
  
    return (
      <div>
        {/* Display game title conditionally */}
        <div className="details-box">
          <h2 style={{ color: "#b65bd9", textAlign: "left", marginLeft: 14, fontSize: 18 }}>
            {currentGame.title}
          </h2>
          {/* CURRENT GAME INFO */}
          <span style={{color: "white", marginLeft: 14, fontSize: 14}}>{currentGame.info}</span>
          <br/>
          <br/>
          <span style={{color: "white", textAlign: "left", marginLeft: 14, fontSize: 14}}>Developer: {currentGame.developer}</span>
          <br/>
          <span style={{color: "white", textAlign: "left", marginLeft: 14, fontSize: 14}}>Publisher: {currentGame.publisher}</span>
          <br/>
          <br/>
          <span style={{color: "white", textAlign: "left", marginLeft: 14, fontSize: 14}}>{currentGame.rating}        {currentGame.ratingCount}</span>
          <br/>
          <span style={{color: "white", textAlign: "left", marginLeft: 14, fontSize: 14}}>Tag Tag Tag Tag</span>
        </div>
            <Swiper
            className="game-carousel"
            modules={[Navigation, Pagination, EffectCoverflow]}
            /* 
              autoplay={{
                  delay:1500,
                  disableOnInteraction: false,
              }}
            */
            loop={true}
            spaceBetween={50} 
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
                rotate: 0,
                depth: 200,
            }}
            onSlideChange={(swiper) => setCurrentGame(games[swiper.realIndex])} // Update the title on slide change
            >
            {games.map((game, index) => (
                <SwiperSlide 
                className="game-carousel-slide"
                key={index}>
                <img src={game.img} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
            ))}
            </Swiper>
      </div>
    );
  }
  
  export default Carousel;
