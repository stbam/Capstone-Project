import React from "react";
import Button from "@mui/material/Button";
import {useState} from 'react';
import { Link } from "react-router-dom";
import '../App.css';

var counter ={
    following : 9,
    followers : 23,
};

export default function FollowButton() {

    /*const[index, setIndex] = useState(0);*/
    const [follow, setFollow] = useState(false);

    function handleClick(){
        setFollow(!follow);
        if (follow === false) {
            /*setIndex(index + 1);*/
            counter.following = counter.following + 1;
            counter.followers = counter.followers + 1;
        }else{
            /*setIndex(index - 1);*/
            counter.following = counter.following - 1;
            counter.followers = counter.followers - 1;
        }
    }
    return(
        <>
            <div className="edit-button-container">
                <div className="profile-name">
                    <h1>Bharat</h1>
                        <a>{counter.following}</a>
                        <b><Link to="/followers">Followers</Link></b>
                        <b>* {counter.followers} </b>
                        <b><Link to="/following">Following</Link></b>
                    </div>
                <div>
                    <Button className="follow-button-contained" onClick={handleClick}>{follow ? 'Unfollow' : 'Follow'}</Button>
                </div>
            </div>
        </>
    );

}