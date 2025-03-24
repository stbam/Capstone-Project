/* conditionally render this box on the carousel if current game is being displayed */

import React from "react";

function CurrentGameDetails({ game }) {
  if (!game) return null; // Don't render if there's no game selected

  return (
    <div className="details-box">
      <h2 style={{ color: "white", textAlign: "center" }}>{game.title}</h2>
    </div>
  );
}

export default CurrentGameDetails;