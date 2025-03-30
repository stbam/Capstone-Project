import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import Carousel from "../components/carousel";


import Movies from "./movies";
import Games from "./games";
import ImageGrid from '../components/imageGrid'

import arrow from "../assets/images/Arrow right-circle.png";


function Home() {

    return (
        <div>
            <div className="page-content">
                <h1>Home</h1>
            </div>

            <div>
                <Games/>
                <div className="see-more">

                    <Link to="/games">
                        <Button className="custom-contained">See More</Button>
                    </Link>
                </div>
            </div>
            



            <div>
                <Movies/>
                <div className="see-more">
                    <Link to="/movies">
                        <Button className="custom-contained">See More</Button>
                    </Link>
                </div>

            </div>



            <div className="library-cards-subtitle">
            <div className="subtitle">
              <h1 style={{color:'white'}}>Books</h1>
              <h2 style={{margin:'24px',cursor:'pointer',color:'gray'}}><Link to="/books"id="grey-title" >See more <img src={arrow} style={{width:'15px',margin:'0px',cursor:'pointer'}} ></img></Link> </h2> {/* in line style meant to align the Home and See More */}
            </div>
            <div className="library-cards">
              <ImageGrid maxResults={4}></ImageGrid>
             
              
            </div>
          </div>
          
        </div>
    );
}

export default Home;
