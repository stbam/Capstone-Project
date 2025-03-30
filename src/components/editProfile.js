import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import '../App.css'

function EditButton(){
    return (
        <div className="edit-button-container">
                <div>
                    <Link to="/edit">
                        <Button className="edit-button-custom">edit profile</Button>
                    </Link>
                </div>
        </div>
    );
}
export default EditButton;