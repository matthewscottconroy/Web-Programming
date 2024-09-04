const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the hostname and port for the server
const hostname = '127.0.0.1';
const port = 3000;

// Set the directory to serve static files from
const publicDir = path.join(__dirname, 'public');

// Create the server using the http module
const server = http.createServer((req, res) => {
  // Build the file path based on the request URL
  let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

  // Get the file's extension
  const extname = path.extname(filePath);

  // Set the default content type to text/html
  let contentType = 'text/html';

  // Map the extension to the correct content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
  }

  // Read the requested file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If the file is not found, serve a 404 page
        fs.readFile(path.join(publicDir, '404.html'), (err404, content404) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content404, 'utf-8');
        });
      } else {
        // If there is a server error, respond with a 500
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // If the file is found, serve it with the appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

