import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import '../App.css'

function CustomButtons(){
    return (
        <div className="buttons-container">
            <Link to="/signin">
                <Button className="custom-contained">Sign In</Button>
            </Link>

            <Link to="/register">
                <Button className="custom-outlined">Register</Button>
            </Link>
        </div>
    );
}
export default CustomButtons;