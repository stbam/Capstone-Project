import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import movie1 from "../assets/movies_posters/It Comes at Night (2017).png";
import movie2 from "../assets/movies_posters/Dune (2021).png";
import movie3 from "../assets/movies_posters/King Kong (1933).png";
import movie4 from "../assets/movies_posters/Moonlit Winter (2019).png";
import movie5 from "../assets/movies_posters/Poor Things (2023).jpg";
import movie6 from "../assets/movies_posters/Pitch Black (2000).png";
import movie7 from "../assets/movies_posters/The Boy and the Heron (2023).jpg";
import movie8 from "../assets/movies_posters/The Terminator (1984).jpeg";
import movie9 from "../assets/movies_posters/X-Men (2000).jpeg";
import movie10 from "../assets/movies_posters/Wolf (1994).png";
import movie11 from "../assets/movies_posters/The Violent Men (1955).jpg";
import movie12 from "../assets/movies_posters/The Matrix Reloaded (2003).jpeg";
import movie13 from "../assets/movies_posters/Us (2019).jpg";
import movie14 from "../assets/movies_posters/Halloween 5- The Revenge of Michael Myers (1989).jpg";

const paths = [
    {title: "It Comes at Night (2017)", path: movie1},
    {title: "Dune (2021)", path: movie2},
    {title: "King Kong (1933)", path: movie3},
    {title: "Moonlit Winter (2019)", path: movie4},
    {title: "Poor Things (2023)", path: movie5},
    {title: "Pitch Black (2000)", path: movie6},
    {title: "The Boy and the Heron (2023)", path: movie7},
    {title: "The Terminator (1984)", path: movie8},
    {title: "X-Men (2000)", path: movie9},
    {title: "Wolf (1994)", path: movie10},
    {title: "The Violent Men (1955)", path: movie11},
    {title: "The Matrix Reloaded (2003)", path: movie12},
    {title: "Us (2019)", path: movie13},
    {title: "Halloween 5- The Revenge of Michael Myers (1989)", path: movie14},
];

function Movies3(){
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
                                <div className="hover-box-movie">
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

export default Movies3;