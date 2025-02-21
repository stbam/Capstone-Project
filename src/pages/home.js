import React from "react";
import Carousel from "../components/carousel";

function Home() {
    return (

      <div>
        <div className="page-content">
          <h1>Home</h1>
        </div>
        
        <div className="foryou-box">
          {/* Carousel code from carousel.js */}
          <Carousel/>
        </div>
          <div className="divider foryou-topline"></div>
          <div className="divider foryou-bottomline"></div>
      </div>

    );
  }
  
  export default Home;