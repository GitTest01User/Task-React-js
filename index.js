const express = require('express');
const cors = require('cors');
const path = require('path');
const Routes = require('./Route/Users'); // Import your routes

const app = express();
const Port = process.env.PORT || 3004; // Use environment variable or default to 3004

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Health check route
app.get("/Status", (req, res) => {
    res.status(200).send("Server is healthy and running!");
});

// Serve static assets from the 'Frontend/build' directory
app.use(express.static(path.join(__dirname, 'Frontend','build')));

// Fallback to serve React app for unknown routes (SPA)
app.get("frontend", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend','build','index.html'));
});

// API Routes
app.use(Routes); // Route for all API endpoints

// Error handling for unknown routes
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

// Start the server
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
