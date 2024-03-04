const express = require("express");
const path = require("path");

// Initialize the Express application
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "frontend/build")));

// API endpoints
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// All other GET requests not handled before will return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
