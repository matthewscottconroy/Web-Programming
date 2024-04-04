const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Use body-parser middleware
app.use(bodyParser.json());

// In-memory "database" for this example
const users = [];

// Helper function to find user by username
const findUserByUsername = (username) => users.find(user => user.username === username);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`username: ${username} password: ${password}`);
        // Check if the user already exists
        if (findUserByUsername(username)) {
            return res.status(400).send('User already exists.');
        }

        // Salt and hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user (in-memory for this example)
        users.push({ username, password: hashedPassword });

        res.status(201).send('User created.');
    } catch (error) {
        res.status(500).send('Error signing up user.');
    }
});

// Signin Endpoint
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = findUserByUsername(username);

        // User not found
        if (!user) {
            return res.status(400).send('User not found.');
        }

        // Check if the password is correct
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.send('Success.');
        } else {
            res.status(400).send('Invalid password.');
        }
    } catch (error) {
        res.status(500).send('Error signing in user.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

