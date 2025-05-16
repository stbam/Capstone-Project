import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useNavigate } from "react-router-dom";

const Discovery = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found — user must be logged in.");
          return;
        }

        const response = await axios.get("http://localhost:5002/recommendations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        console.log("Fetched recommendations:", response.data);
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-4">
      <div className="page-content">
        <h1>Discover</h1>
      </div>

      {loading ? (
        <p>Loading personalized picks...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations available yet.</p>
      ) : (
        <div className="outer-box">
          <div className="foryou-moviebox">
            <div className="swiper-wrapper-container">
              <Swiper
                className="swiper-slides-container-movie"
                spaceBetween={10}
                slidesPerView={5}
                grid={{ rows: 2, fill: "row" }}
                modules={[Navigation, Grid, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                style={{ width: "100%" }}
              >
                {recommendations.map((movie) => {
                  console.log("Movie poster path:", movie.poster_path);
                  return (
                    <SwiperSlide key={movie.tmdb_id} className="swiper-slide-movie">
                      <div
                        className="image-container group"
                        style={{ position: "relative", cursor: "pointer" }}
                        onClick={() => navigate(`/movie/${movie.tmdb_id}`)}
                      >
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "/placeholder.jpg"
                          }
                          alt={movie.title || "Movie poster"}
                          style={{ width: "200px", height: "auto" }}
                        />

                        <div
                          className="hover-box group-hover:block"
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "0",
                            width: "400px",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "white",
                            padding: "15px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            zIndex: 10,
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            overflowY: "auto",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              color: "#B200ED",
                              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <strong>{movie.movie}</strong>
                          </p>
                          <p style={{ fontStyle: "italic", opacity: 0.8 }}>
                            {movie.tagline}
                          </p>
                          <p>
                            <strong style={{ color: "#89CFF0" }}>Rating:</strong>{" "}
                            {movie.vote_average} / 10
                          </p>
                          <p>
                            <strong style={{ color: "#89CFF0" }}>Release:</strong>{" "}
                            {movie.release_date}
                          </p>
                          <p>{movie.overview}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discovery;
