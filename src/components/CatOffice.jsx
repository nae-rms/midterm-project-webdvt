import { useState } from "react";

import { useTheme } from "../context/ThemeContext";

import brownCat from "../assets/cat-office/cats/brown2.png";
import whiteCat from "../assets/cat-office/cats/white.png";

import "../styles/CatOffice.css";

function CatOffice() {
  const { theme } = useTheme();

  const [message, setMessage] = useState(
    "Meow! Welcome back."
  );

  const cat = theme === "dark"
    ? whiteCat
    : brownCat;

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
          className={`ledger-cat-image ${
            theme === "dark" ? "cat-white" : "cat-brown"
          }`}
        />
      </button>

      <div className="cat-speech">
        {message}
      </div>

    </div>
  );
}

export default CatOffice;