import { useState } from "react";
import "./Flashcard.css"; // Import the CSS file

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard-container ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard">
        <div className="flashcard-front shadow-lg hover:scale-105 duration-300">
          <p>{flashcard.question}</p>
        </div>
        <div className="flashcard-back shadow-lg">
          <p>{flashcard.answer}</p>
        </div>
      </div>
    </div>
  );
}



export default Flashcard;
