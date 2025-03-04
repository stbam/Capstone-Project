import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import img1 from "../assets/test_images/header_alyx.png";
import img2 from "../assets/test_images/header_dredge.jpg";
import img3 from "../assets/test_images/header_limbus.jpg";
import img4 from "../assets/test_images/header_lobotomy.jpg";
import img5 from "../assets/test_images/header_fear.png";
import img6 from "../assets/test_images/header_forest.jpg";
import img7 from "../assets/test_images/header_lethal.png";
import img8 from "../assets/test_images/header_miside.png";
import img9 from "../assets/test_images/header_nightmares.png";
import img10 from "../assets/test_images/header_phas.jpg";
import img11 from "../assets/test_images/header_signalis.png";
import img12 from "../assets/test_images/shheader.jpg";
import img13 from "../assets/test_images/header_wof.png";
import img14 from "../assets/test_images/header_re4.png";

const paths = [
    { title: "Half Life: Alyx", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img1 },
    { title: "Dredge", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img2 },
    { title: "Limbus Company", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img3 },
    { title: "Lobotomy Corporation", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img4 },
    { title: "Fear and Hunger", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img5 },
    { title: "Sons of the Forest", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img6 },
    { title: "Lethal Company", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img7 },
    { title: "MiSide", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img8 },
    { title: "Little Nightmares", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img9 },
    { title: "Phasmophobia", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img10 },
    { title: "Signalis", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img11 },
    { title: "Silent Hill 2", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img12 },
    { title: "World of Horror", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img13 },
    { title: "Resident Evil 4", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img14 },
];

function HorrorGames() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the visibility
    };

    return (
        <div>
            <Swiper className="swiper-slides-container"
                spaceBetween={10}
                slidesPerView={5}
                grid={{ rows: 2, fill: "row" }} // Ensure row-wise filling
                modules={[Navigation, Grid, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                style={{ width: "100%" }}
            >
                {paths.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="image-container"
                            style={{ width: "100%" }}
                            onClick={() => handleClick(index)} // Add click handler
                        >
                            <img src={item.path} alt={item.title} />
                            {activeIndex === index && (
                                <div className="hover-box">
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
                                    <p>{item.developer}</p>
                                    <p>{item.publisher}</p>
                                    <p>{item.review}</p>
                                    <p>{item.reviewCount}</p>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HorrorGames;
