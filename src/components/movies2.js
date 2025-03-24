import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import movie1 from "../assets/movies_posters/Scream (1996).png";
import movie2 from "../assets/movies_posters/Jackie Brown (1997).jpg";
import movie3 from "../assets/movies_posters/Taxi Driver (1976).jpg";
import movie4 from "../assets/movies_posters/M_A_S_H (1970).jpg";
import movie5 from "../assets/movies_posters/She's So Lovely (1997).png";
import movie6 from "../assets/movies_posters/It Chapter Two (2019).jpeg";
import movie7 from "../assets/movies_posters/Planet of the Apes (1968).jpeg";
import movie8 from "../assets/movies_posters/Taxi Driver (1976).jpg";
import movie9 from "../assets/movies_posters/The Wrong Trousers (1993).png";
import movie10 from "../assets/movies_posters/Instinct (2019).png";
import movie11 from "../assets/movies_posters/Halloween (1978).png";
import movie12 from "../assets/movies_posters/The Revenant (2015).png";
import movie13 from "../assets/movies_posters/The Evil Dead (1981).jpg";
import movie14 from "../assets/movies_posters/Rango (2011).png";

const paths = [
    {title: "Scream (1996)", path: movie1},
    {title: "Jackie Brown (1997)", path: movie2},
    {title: "Taxi Driver (1976)", path: movie3},
    {title: "M_A_S_H (1970)", path: movie4},
    {title: "She's So Lovely (1997)", path: movie5},
    {title: "It Chapter Two (2019)", path: movie6},
    {title: "Planet of the Apes (1968)", path: movie7},
    {title: "Taxi Driver (1976)", path: movie8},
    {title: "The Wrong Trousers (1993)", path: movie9},
    {title: "Instinct (2019)", path: movie10},
    {title: "Halloween (1978)", path: movie11},
    {title: "The Revenant (2015)", path: movie12},
    {title: "The Evil Dead (1981)", path: movie13},
    {title: "Rango (2011)", path: movie14},
];

function Movies2(){
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

export default Movies2;