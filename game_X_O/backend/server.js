const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

let games = []; // To store game statistics

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint to get the current game statistics
app.get('/api/games', (req, res) => {
    res.json(games);
});

// Endpoint to reset game statistics
app.post('/api/games/reset', (req, res) => {
    games = [];
    res.json({ message: "Game statistics reset." });
});

// Endpoint to update game statistics
app.post('/api/games/update', (req, res) => {
    const { winner } = req.body;
    games.push({ winner, date: new Date() });
    res.json({ message: "Game statistics updated." });
});

// Serve the index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
