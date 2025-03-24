import React from "react";
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
  
  /*import React from "react";

function Books() {
    return (
      <div>
      <div className="page-content">
          <h1>Books</h1>
      </div>

      <div className="category">
          <h2>Action</h2>
          <div className="foryou-box"></div>
      </div>

      <div className="category">
          <h2>Horror</h2>
          <div className="foryou-box"></div>
      </div>

      <div className="category">
          <h2>Adventure</h2>
          <div className="foryou-box"></div>
      </div>

      <div className="category">
          <h2>Casual</h2>
          <div className="foryou-box"></div>
      </div>
  </div>
    );
  }
  
  export default Books;*/