import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import img1 from "../assets/test_images/header_handdr_birth.jpg";
import img2 from "../assets/test_images/header_handdr_coffin.jpg";
import img3 from "../assets/test_images/header_handdr_sallyface.jpg";
import img4 from "../assets/test_images/header_handdr_unfriendlyfriend.jpg";
import img5 from "../assets/test_images/header_handdr_cuphead.jpg";
import img6 from "../assets/test_images/header_handdr_fallenaces.jpg";
import img7 from "../assets/test_images/header_handdr_storyteller.jpg";
import img8 from "../assets/test_images/header_handdr_hades2.jpg";
import img9 from "../assets/test_images/header_handdr_thankgoodness.jpg";
import img10 from "../assets/test_images/header_handdr_woods.jpg";
import img11 from "../assets/test_images/header_handdr_potioncraft.jpg";
import img12 from "../assets/test_images/header_handdr_omori.jpg";
import img13 from "../assets/test_images/header_handdr_skullgirls.jpg";
import img14 from "../assets/test_images/header_handdr_hollow.jpg";

const paths = [
    { title: "Birth", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img1 },
    { title: "The Coffin of Andy and Leyley", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img2 },
    { title: "Sally Face", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img3 },
    { title: "Unfriendly Friend", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img4 },
    { title: "Cuphead", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img5 },
    { title: "Fallen Aces", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img6 },
    { title: "Storyteller", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img7 },
    { title: "Hades 2", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img8 },
    { title: "Thank Goodness You're Here", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img9 },
    { title: "Night in the Woods", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img10 },
    { title: "Potion Craft", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img11 },
    { title: "Omori", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img12 },
    {title: "Skull Girls", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img13},
    {title: "Hollow Knight", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img14}
];

function HandDrawnGames(){
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <Swiper className="swiper-slides-container"
                spaceBetween={10}
                slidesPerView={5}
                grid={{ rows: 2, fill: "row" }}
                modules={[Navigation, Grid, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                style={{ width: "100%" }}
            >
                {paths.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-container" onClick={() => handleClick(index)}>
                            <img src={item.path} />
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
};

export default HandDrawnGames;