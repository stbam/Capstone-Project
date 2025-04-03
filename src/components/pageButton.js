import React from "react";
import Button from "@mui/material/Button";
import {useState} from 'react';
import '../App.css'
import { userActivity } from "./userActivityData";

export default function PageButton(){
    /*const [index, setIndex] = useState(0);

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
    const testActivity = userActivity;
    let activity = userActivity[index];*/
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
                        <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
                    </div>
                    <div className="user-activity-name">
                        <p>Bharat</p>
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
        {/*<div className="user-activity">
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
        </div>*/}
        <div>
            {userActivity.map(timestamp => (
                <li className="timeline-design" key={userActivity.entryNo}>
                        {DisplayActivity(timestamp.entryNo)}
                </li>
            ))}
        </div>
    </div>
    );
}