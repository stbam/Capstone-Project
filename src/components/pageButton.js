import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../App.css'
import avatar from "../assets/images/user-avatar.png"
import { userActivity } from "./userActivityData";
import axios from "axios";

export default function PageButton(){
    const [userBooks, setUserBooks] = useState([]);
    const [userMovies, setUserMovies] = useState([]);
    const [userGames, setUserGames] = useState([]);
    const [userProfilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch(`http://localhost:3003/${username}/books`);
          const data = await response.json();
          setUserBooks(data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      if (username) fetchBooks();
    }, [username]);

  useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch(`http://localhost:3003/${username}/movies`);
          const data = await response.json();
          setUserMovies(data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      if (username) fetchMovies();
    }, [username]);

    useEffect(() => {
        const fetchGames = async () => {
          try {
            const response = await fetch(`http://localhost:3003/${username}/games`);
            const data = await response.json();
            setUserGames(data);
          } catch (error) {
            console.error("Error fetching games:", error);
          }
        };
    
        if (username) fetchGames();
      }, [username]);

    function formatTitle(entry){
        if(entry.mediaType == 'game'){
            return <p>started playing {entry.title}</p>
        }else if(entry.mediaType == 'book'){
            return <p>started reading <i>{entry.title}</i></p>
        }else{
            return <p>started watching <i>{entry.title}</i></p>
        }
    }

    function checkNewDate(entry, listNO){
        if(listNO == 0){
            return <div className="user-activity-date"> {userActivity[listNO].date} </div>
        }
        else if((listNO > 0) && (entry[listNO].date != entry[listNO - 1].date)){
            return <div className="user-activity-date"> {userActivity[listNO].date} </div>
        }else{
            return  <div className="user-activity-date"></div>
        }
    }
    function DisplayActivity(listNO){
        if(listNO < (userActivity.length)){
            return(
                <div className="user-activity">
                    {checkNewDate(userActivity, listNO)}
                    <div className="user-activity-icon">
                        <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                    </div>
                    <div className="user-activity-name">
                        <p>{username}</p>
                    </div>
                    <div className="user-activity-log">
                        {formatTitle(userActivity[listNO])}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="user-activity">
                    <p>end of the line</p>
                </div>
            )
        }
    }

    return (
    <div>
        <div>
            {userBooks.length > 0 ? (
                userBooks.map((book, index) => (
                    <Link
                        key={book.id || index}
                        to={`/book/${book.id}`}
                    >
                        <div className="timeline-design">
                            <div className="user-activity">
                                <div className="user-activity-icon">
                                    <img src={userProfilePic|| "https://avatars.githubusercontent.com/u/19550456"} height={50} width={50} style={{borderRadius: "50%",}}/>
                                </div>
                                <div className="user-activity-name">
                                    <p>{username}</p>
                                </div>
                                <div className="user-activity-log">
                                    <p>started reading <i>{book.title}</i></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : <div>
                <p></p>
                </div>
                }
            {userMovies.length > 0 ? (
                userMovies.map((movie, index) => (
                    <Link
                        key={movie.id || index}
                        to={`/movie/${movie.id}`}
                    >
                        <div className="timeline-design">
                            <div className="user-activity">
                                <div className="user-activity-icon">
                                    <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                                </div>
                                <div className="user-activity-name">
                                    <p>{username}</p>
                                </div>
                                <div className="user-activity-log">
                                    <p>started watching <i>{movie.title}</i></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : <div>
                <p></p>
                </div>
                }
            {userGames.length > 0 ? (
                userGames.map((game, index) => (
                    <Link
                        key={game.id || index}
                        to={`/game/${game.id}`}
                    >
                        <div className="timeline-design">
                            <div className="user-activity">
                                <div className="user-activity-icon">
                                    <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                                </div>
                                <div className="user-activity-name">
                                    <p>{username}</p>
                                </div>
                                <div className="user-activity-log">
                                    <p>started playing <i>{game.title}</i></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : <div>
                <p>No further activity</p>
                </div>
                }
        </div>
    </div>
    );
}