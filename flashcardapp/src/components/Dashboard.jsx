import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: "", answer: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Fetch flashcards from the backend
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards`).then((response) => {
        console.log(response.data);
      setFlashcards(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setNewFlashcard({ ...newFlashcard, [e.target.name]: e.target.value });
  };

  const handleAddFlashcard = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards`, newFlashcard).then((response) => {
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ question: "", answer: "" });
    });
  };

  const handleEditFlashcard = (id) => {
    const updatedFlashcard = flashcards.find((card) => card.id === id);
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards/${id}`, updatedFlashcard).then((response) => {
      setFlashcards(
        flashcards.map((card) => (card.id === id ? response.data : card))
      );
      setEditing(null);
    });
  };

  const handleDeleteFlashcard = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards/${id}`).then(() => {
      setFlashcards(flashcards.filter((card) => card.id !== id));
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddFlashcard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Flashcard
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Answer</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flashcards.map((flashcard) => (
            <tr key={flashcard.id}>
              <td className="border px-4 py-2">
                {editing === flashcard.id ? (
                  <input
                    type="text"
                    value={flashcard.question}
                    onChange={(e) =>
                      setFlashcards(
                        flashcards.map((card) =>
                          card.id === flashcard.id
                            ? { ...card, question: e.target.value }
                            : card
                        )
                      )
                    }
                  />
                ) : (
                  flashcard.question
                )}
              </td>
              <td className="border px-4 py-2">
                {editing === flashcard.id ? (
                  <input
                    type="text"
                    value={flashcard.answer}
                    onChange={(e) =>
                      setFlashcards(
                        flashcards.map((card) =>
                          card.id === flashcard.id
                            ? { ...card, answer: e.target.value }
                            : card
                        )
                      )
                    }
                  />
                ) : (
                  flashcard.answer
                )}
              </td>
              <td className="border px-4 py-2 w-[250px]">
                {editing === flashcard.id ? (
                  <button
                    onClick={() => handleEditFlashcard(flashcard.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditing(flashcard.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFlashcard(flashcard.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
