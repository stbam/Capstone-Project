import searchLogo from '../assets/images/search-svgrepo-com.svg';
import { useState } from 'react';
import './SearchBar.css'

const AutocompleteSearchBar  = ({query, setQuery}) => {
  const [inputValue, setInputValue] = useState(query);
  const handleSearch = () => {
    setQuery(inputValue);  // Update query when the image is clicked not automaticall
    
  };
    return (
      <div
        style={{
          padding: "10px",
          borderRadius: "8px", /* Rounds out the corners */
          border: "1px solid #ccc",
          backgroundColor: "white", /* This provides the white BG for the search bar, without this, it inherents the gray navbar color */
          width: "2100px", /*width originally */
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {/* Image logo used for search icon */}
        <img src={searchLogo} alt="looking-glass" height={16} width={16} style = {{cursor:'pointer'}}
          onClick={handleSearch}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: "100%",
            border: 'none',
            zIndex: "1",
          }}
        />
        
      </div>
    );
  }
export default AutocompleteSearchBar