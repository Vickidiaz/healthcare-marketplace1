// server.js

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require("./config"); // Require the config.js file

// Initialize the Express application
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Database connection
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

// API endpoints
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Route to fetch data from the database
app.get("/users", (req, res) => {
  // Query database to fetch user data
  connection.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      console.error("Error retrieving data from database:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    // Send retrieved data as JSON response
    res.json(results);
  });
});

// All other GET requests not handled before will return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
