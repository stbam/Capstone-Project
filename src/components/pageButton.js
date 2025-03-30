import React from "react";
import Button from "@mui/material/Button";
import {useState} from 'react';
import '../App.css'
import { userActivity } from "./userActivityData";

export default function PageButton(){
    const [index, setIndex] = useState(0);

    function handleNextClick(){
        if(index < (userActivity.length - 1)){
            setIndex(index + 1);
        }
        else{
            return(
                <div>
                <p>nothing to see here</p>
                </div>
            );
        }
    }
    function handleBackClick(){
        if(index > 0){
            setIndex(index - 1);
        }
    }
    let activity = userActivity[index];
    var goat = 4;
    var kobe = 0;
    /*function MakeButton(){
        for (let i = 0; i < 4; i++){
            const button = document.createElement('button');
            button.text = `${i+1}`;
            button.number = `${i}`
            button.addEventListener('click', handleClick());
        }
    }
    function DisplayActivity(){
        return(
            <div className="page-counter">{MakeButton()}
            {MakeButton()}
            {MakeButton()}
            </div>
        )
    }*/

    return (
        <div>
        <div className="user-activity">
            <div className="user-activity-date"> {activity.date} </div>
            <div className="user-activity-icon">
                <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
            </div>
            <div className="user-activity-name">
                <p>Bharat</p>
            </div>
            <div className="user-activity-log">
                <p>started watching <i>{activity.movie}</i></p>
            </div>
        </div>
        
        <div className="user-activity">
            <div className="user-activity-date"> {activity.date} </div>
            <div className="user-activity-icon">
                <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
            </div>
            <div className="user-activity-name">
                <p>Bharat</p>
            </div>
            <div className="user-activity-log">
                <p>started watching <i>{activity.movie}</i></p>
            </div>
        </div>
        <div className="page-button-container">
            <div className="page-counter">
                <div>
                    <Button className="page-button-outline" onClick={handleBackClick} disabled={index == 0}>Prev</Button>
                    <Button className="page-button-outline" onClick={handleNextClick} disabled={index == userActivity.length - 1}>Next</Button>
                </div>
            </div>
        </div>
    </div>
    );
}