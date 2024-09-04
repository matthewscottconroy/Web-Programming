const http = require('http');

// Define the hostname and port for the server
const hostname = '127.0.0.1';
const port = 3000;

// Create the server using the http module
const server = http.createServer((req, res) => {
  // Set the response header content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Respond with a simple message
  res.end('Hello, this is your simplified web server!');
});

// Listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

