import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import img1 from "../assets/test_images/header_cozy_hellkitty.jpg";
import img2 from "../assets/test_images/header_cozy_chonkers.jpg";
import img3 from "../assets/test_images/header_cozy_galaxyburger.jpg";
import img4 from "../assets/test_images/header_cozy_fm.jpg";
import img5 from "../assets/test_images/header_cozy_galaxy.jpg";
import img6 from "../assets/test_images/header_cozy_tg.jpg";
import img7 from "../assets/test_images/header_cozy_gourdlets.jpg";
import img8 from "../assets/test_images/header_cozy_love_ghostie.jpg";
import img9 from "../assets/test_images/header_cozy_summerhouse.jpg";
import img10 from "../assets/test_images/header_cozy_kitty.jpg";
import img11 from "../assets/test_images/header_cozy_naught.jpg";
import img12 from "../assets/test_images/header_cozy_ropuka.jpg";
import img13 from "../assets/test_images/header_cozy_melatonin.jpg";
import img14 from "../assets/test_images/header_cozy_left.jpg";

const paths = [
    { title: "Hello Kitty Island Adventure", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img1 },
    { title: "Chonkers", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img2 },
    { title: "Galaxy Burger", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img3 },
    { title: "Fruit Mountain", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img4 },
    { title: "Little-Known Galaxy", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img5 },
    { title: "Tiny Glade", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img6 },
    { title: "Gourdlets", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img7 },
    { title: "Love, Ghostie", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img8 },
    { title: "Summer House", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img9 },
    { title: "Little Kitty Big City", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img10 },
    { title: "Loddlenaut", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img11 },
    { title: "Ropuka's Idle Island", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img12 },
    { title: "Melatonin", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img13 },
    { title: "A Little to the Left", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img14 }
];

function CozyGames(){
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
                                <img src={item.path} className="game-poster" alt={item.title} />
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

export default CozyGames;