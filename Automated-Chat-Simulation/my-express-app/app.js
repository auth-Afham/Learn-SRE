const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database initialized");
    db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, user TEXT, message TEXT)');
  }
});

// API endpoint to get messages
app.get("/messages", (req, res) => {
  db.all('SELECT * FROM messages', [], (err, rows) => {
    if (err) {
      console.error("Error fetching messages:", err.message);
      res.status(500).send({ error: "Failed to fetch messages" });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to send a message
app.post("/messages", (req, res) => {
  const { user, message } = req.body;

  // Insert new message into the database
  db.run('INSERT INTO messages (user, message) VALUES (?, ?)', [user, message], function(err) {
    if (err) {
      console.error("Error inserting message:", err.message);
      res.status(500).send({ error: "Failed to send message" });
      return;
    }
    res.json({ id: this.lastID, user, message });
  });
});

// API endpoint to view the entire database (for debugging purposes)
app.get("/db", (req, res) => {
  db.all('SELECT * FROM messages', [], (err, rows) => {
    if (err) {
      console.error("Error fetching messages:", err.message);
      res.status(500).send({ error: "Failed to fetch messages" });
      return;
    }
    res.json(rows);  // Sends the entire list of messages from the database
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
