const net = require('net');

const port = 3000;

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');

  // When the server receives data, it will echo it back to the client
  socket.on('data', (data) => {
    console.log('Received data:', data.toString());
    socket.write(data);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Handle any socket errors
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

