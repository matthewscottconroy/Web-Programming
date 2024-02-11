const express = require('express');
const path = require('path');

const app = express();

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Custom middleware to add .html extension
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1) { // Check if the path has an extension
    const file = path.join(__dirname, 'public', `${req.path}.html`);
    res.sendFile(file, (err) => {
      if (err) next(); // If the file does not exist, move on to the next middleware
    });
  } else {
    next(); // Proceed if the path already has an extension
  }
});

// Serve static files from 'public' folder
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

