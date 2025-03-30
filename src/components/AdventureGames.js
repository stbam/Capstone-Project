import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import img1 from "../assets/test_images/header_9sol.jpg";
import img2 from "../assets/test_images/header_atlyss.jpg";
import img3 from "../assets/test_images/header_batman.jpg";
import img4 from "../assets/test_images/header_dave.jpg";
import img5 from "../assets/test_images/header_gow.jpg";
import img6 from "../assets/test_images/header_rust.jpg";
import img7 from "../assets/test_images/header_hog.jpg";
import img8 from "../assets/test_images/header_oblivion.jpg";
import img9 from "../assets/test_images/header_skyrim.jpg";
import img10 from "../assets/test_images/header_stray.jpg";
import img11 from "../assets/test_images/header_sot.jpg";
import img12 from "../assets/test_images/header_terraria.jpg";
import img13 from "../assets/test_images/header_tomb.jpg";
import img14 from "../assets/test_images/header_yak.jpg";


const paths = [
    {title: "Nine Sols", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img1},
    {title: "Atlyss" , description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img2},
    {title: "Batman", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img3},
    {title: "Dave the Diver", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img4},
    {title: "God of War", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img5},
    {title: "Rust", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img6},
    {title: "Hogwarts Legacy", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img7},
    {title: "Oblivion", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img8},
    {title: "Skyrim", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img9},
    {title: "Stray", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img10},
    {title: "Sea of Thieves", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img11},
    {title: "Terraria", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img12},
    {title: "Tomb Raider", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img13},
    {title: "Yakuza", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img14},
];

function AdventureGames(){
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <div className="swiper-wrapper-container">
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
        </div>
    );
}

export default AdventureGames;