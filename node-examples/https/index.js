const https = require('https');
const fs = require('fs');
const express = require('express');

// Create an Express app
const app = express();

// HTTPS options
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

// Create HTTPS server and pass the Express app as the request handler
https.createServer(options, app).listen(3000, () => {
  console.log('Server is running on https://localhost:3000');
});

