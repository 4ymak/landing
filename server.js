// Import the Express module
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { name, surname, color } = req.body;

    // Create a CSV row
    const csvRow = `${name},${surname},${color}\n`;

    // Append the row to the CSV file
    const filePath = path.join(__dirname, 'data', 'submissions.csv');
    fs.appendFile(filePath, csvRow, (err) => {
        if (err) {
            console.error('Error writing to CSV file:', err);
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});