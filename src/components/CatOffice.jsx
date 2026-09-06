import { useState } from "react";

import cat from "../assets/cat-office/cats/brown2.png";

import "../styles/CatOffice.css";

function CatOffice() {
  const [message, setMessage] = useState(
    "Meow! Welcome back."
  );

  function handleCatClick() {
    setMessage((currentMessage) => {
      if (currentMessage === "Meow! Welcome back.") {
        return "How's your ledger?";
      }

      if (currentMessage === "How's your ledger?") {
        return "Keep track of those expenses.";
      }

      return "Meow! Welcome back.";
    });
  }

  return (
    <div className="ledger-cat">

      <button
        className="cat-button"
        onClick={handleCatClick}
        aria-label="Talk to the ledger cat"
      >
        <img
          src={cat}
          alt="Ledger cat"
          className="ledger-cat-image"
        />
      </button>

      <div className="cat-speech">
        {message}
      </div>

    </div>
  );
}

export default CatOffice;