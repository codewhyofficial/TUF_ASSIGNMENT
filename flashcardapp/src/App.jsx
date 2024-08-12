import React, { useState, useEffect } from "react";
import Flashcard from "./components/Flashcard";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch flashcards from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards`)
      .then((response) => {
        setFlashcards(response.data);
      });
  }, []);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
        {flashcards.length > 0 ? (
          <Flashcard flashcard={flashcards[currentIndex]} />
        ) : (
          <p>Loading flashcards...</p>
        )}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 duration-100 hover:scale-105"
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 duration-100 hover:scale-105"
            disabled={currentIndex === flashcards.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
