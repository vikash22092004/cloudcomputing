const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve the static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

// File where student data will be stored
const dataFilePath = path.join(__dirname, 'students.json');

// Function to read data from JSON file
function readDataFromFile() {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    } else {
        return {};
    }
}

// Function to write data to JSON file
function writeDataToFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Route to save student details
app.post('/save-student', (req, res) => {
    const { name, age, roll } = req.body;

    if (!name || !age || !roll) {
        return res.status(400).send('All fields are required.');
    }

    // Read current data
    const data = readDataFromFile();

    // Add new student details
    data[name] = { age, roll };

    // Write updated data back to file
    writeDataToFile(data);

    res.send('Student details saved successfully!');
});

// Route to retrieve student details
app.get('/get-student/:name', (req, res) => {
    const studentName = req.params.name;

    // Read current data
    const data = readDataFromFile();

    if (data[studentName]) {
        res.json(data[studentName]);
    } else {
        res.status(404).send('Student not found.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
