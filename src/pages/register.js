import React from "react";
import { Link } from 'react-router-dom';

function Register() {
    return (
      <div>
        <div>
          <div className="top-bar">
                <nav>
                    <Link to="/home" class="bingr">bingr</Link>
                </nav>
          </div>
          <div className="page-content">
            <h1>Registration Page</h1>
            <p>This is the Registration page!</p>
          </div>
        </div>
      </div>

    );
  }
  
  export default Register;