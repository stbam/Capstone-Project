import searchLogo from '../assets/images/search-svgrepo-com.svg';
import './SearchBar.css'
const AutocompleteSearchBar  = ({query, setQuery}) => {
    return (
      <div
        style={{
          padding: "10px",
          borderRadius: "8px", /* Rounds out the corners */
          border: "1px solid #ccc",
          backgroundColor: "white", /* This provides the white BG for the search bar, without this, it inherents the gray navbar color */
          width: "2100px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {/* Image logo used for search icon */}
        <img src={searchLogo} alt="looking-glass" height={16} width={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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