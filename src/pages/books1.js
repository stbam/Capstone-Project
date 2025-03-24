import React from "react";
import Button from "../components/button"
import ImageGrid from '../components/imageGrid'
function Books({query,setQuery}) {
    return (
      <div className="page-content">
        <h1>Books Page</h1>
        
        <ImageGrid  maxResults={20} query={query} setQuery={setQuery}></ImageGrid>
        
      </div>
    );
  }
  
  export default Books;