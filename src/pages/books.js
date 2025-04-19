import React from "react";
import ImageGrid from '../components/imageGrid'
function Books({query,setQuery,books,setBooks}) {
    return (
      <div className="page-content">
        <h1>Books Page</h1>
        
        <ImageGrid  maxResults={20} query={query} setQuery={setQuery} books={books} setBooks={setBooks}></ImageGrid>
        
      </div>
    );
  }
  
  export default Books;