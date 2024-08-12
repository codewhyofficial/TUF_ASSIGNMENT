const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "flashcard_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Get all flashcards
app.get("/api/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a new flashcard
app.post("/api/flashcards", (req, res) => {
  const { question, answer } = req.body;
  db.query(
    "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
    [question, answer],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({ id: result.insertId, question, answer });
      }
    }
  );
});

// Update a flashcard
app.put("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query(
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id, question, answer });
      }
    }
  );
});

// Delete a flashcard
app.delete("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM flashcards WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
