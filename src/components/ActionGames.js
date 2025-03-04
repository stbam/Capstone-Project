import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import img1 from "../assets/test_images/header_bio.png";
import img2 from "../assets/test_images/header_ff7.png";
import img3 from "../assets/test_images/header_indy.png";
import img4 from "../assets/test_images/header_red.png";
import img5 from "../assets/test_images/header_ultrakill.png";
import img6 from "../assets/test_images/header_bg3.png";
import img7 from "../assets/test_images/header_counter.jpg";
import img8 from "../assets/test_images/header_ds3.jpg";
import img9 from "../assets/test_images/header_hell.jpg";
import img10 from "../assets/test_images/header_kcd.png";
import img11 from "../assets/test_images/header_lies.jpg";
import img12 from "../assets/test_images/header_outlaws.jpg";
import img13 from "../assets/test_images/header_re4.png";
import img14 from "../assets/test_images/header_rust.jpg";

const paths = [
    { title: "Bioshock", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img1 },
    { title: "Final Fantasy 7", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img2 },
    { title: "Indiana Jones and the Great Circle", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img3 },
    { title: "Red Dead Redemption 2", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img4 },
    { title: "Ultrakill", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img5 },
    { title: "Baldur's Gate 3", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img6 },
    { title: "Counter Strike", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img7 },
    { title: "Dark Souls 3", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img8 },
    { title: "Helldivers", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img9 },
    { title: "Kingdom Com: Deliverance II", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img10 },
    { title: "Lies of P", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img11 },
    { title: "Star Wars Outlaws", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img12 },
    {title: "Resident Evil 4", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img13},
    {title: "Rust", description: "game description" ,developer: "game dev", publisher: "game publisher", review: "game view", reviewCount: "review count", path: img14}
];

function ActionGames() {
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
}

export default ActionGames;
