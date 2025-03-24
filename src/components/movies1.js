import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import movie1 from "../assets/movies_posters/2001- A Space Odyssey (1968).jpeg";
import movie2 from "../assets/movies_posters/28 Days Later (2002).png";
import movie3 from "../assets/movies_posters/Akira (1988).jpg";
import movie4 from "../assets/movies_posters/Ant-Man (2015).png";
import movie5 from "../assets/movies_posters/Avengers- Endgame (2019).jpeg";
import movie6 from "../assets/movies_posters/Child's Play 3 (1991).jpg";
import movie7 from "../assets/movies_posters/Django (1966).jpg";
import movie8 from "../assets/movies_posters/Leatherface (2017).png";
import movie9 from "../assets/movies_posters/Nightcrawler (2014).jpeg";
import movie10 from "../assets/movies_posters/Star Wars- Episode I - The Phantom Menace (1999).jpeg";
import movie11 from "../assets/movies_posters/Iron Man 3 (2013).png";
import movie12 from "../assets/movies_posters/The Texas Chain Saw Massacre (1974).png";
import movie13 from "../assets/movies_posters/The Lighthouse (2019).png";
import movie14 from "../assets/movies_posters/The Monkey (2025).jpg";

const paths = [
    { title: "2001- A Space Odyssey (1968)", path: require("../assets/movies_posters/2001- A Space Odyssey (1968).jpeg") },
    { title: "28 Days Later (2002)", path: require("../assets/movies_posters/28 Days Later (2002).png") },
    { title: "Akira (1988)", path: require("../assets/movies_posters/Akira (1988).jpg") },
    { title: "Ant-Man (2015)", path: require("../assets/movies_posters/Ant-Man (2015).png") },
    { title: "Avengers- Endgame (2019)", path: require("../assets/movies_posters/Avengers- Endgame (2019).jpeg") },
    { title: "Child's Play 3 (1991)", path: require("../assets/movies_posters/Child's Play 3 (1991).jpg") },
    { title: "Django (1966)", path: require("../assets/movies_posters/Django (1966).jpg") },
    { title: "The Founder (2016)", path: require("../assets/movies_posters/The Founder (2016).png") },
    { title: "Nightcrawler (2014)", path: require("../assets/movies_posters/Nightcrawler (2014).jpeg") },
    { title: "Star Wars- Episode I - The Phantom Menace (1999)", path: require("../assets/movies_posters/Star Wars- Episode I - The Phantom Menace (1999).jpeg") },
    { title: "Iron Man 3 (2013)", path: require("../assets/movies_posters/Iron Man 3 (2013).png") },
    { title: "The Texas Chain Saw Massacre (1974)", path: require("../assets/movies_posters/The Texas Chain Saw Massacre (1974).png") },
    { title: "The Lighthouse (2019)", path: require("../assets/movies_posters/The Lighthouse (2019).png") },
    { title: "The Monkey (2025)", path: require("../assets/movies_posters/The Monkey (2025).jpg") }
];


function Movies1(){
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <Swiper className="swiper-slides-container-movie"
                spaceBetween={10}
                slidesPerView={5}
                grid={{ rows: 2, fill: "row" }}
                modules={[Navigation, Grid, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                style={{ width: "100%" }}
            >
                {paths.map((item, index) => (
                    <SwiperSlide key={index} className="swiper-slide-movie">
                        <div className="image-container" onClick={() => handleClick(index)}>
                            <img src={item.path} />
                            {activeIndex === index && (
                                <div className="hover-box">
                                    <p>{item.title}</p>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Movies1;