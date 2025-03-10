import React from "react";
import Movies1 from "../components/movies1";
import Movies2 from "../components/movies2";
import Movies3 from "../components/movies3";

function shuffleArray(array){
    return array.sort(() => Math.random() - 0.5);
}

function Movies() {
    const categories = shuffleArray([
        {title: "Placeholder 1", component: <Movies1/>},
        {title: "Placeholder 2", component: <Movies2/>},
        {title: "Placeholder 3", component: <Movies3/>},
    ])
    return (
      <div>
        <div className="page-content">
            <h1>Movies</h1>
        </div>

        {categories.map(({ title, component }) => (
                <div className="category" key={title}>
                    <h2>{title}</h2>
                    <div className="foryou-moviebox">
                        <div className="movies-container">{component}</div>
                    </div>
                </div>
            ))}


        </div>
    );
  }
  
  export default Movies;