const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
    res.writeHead(404);
    res.end();
});

server.on('upgrade', (req, socket, head) => {
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }

    // This is a very simplified version of the WebSocket handshake response
    // Note: This does not handle WebSocket framing, so it won't actually transmit WebSocket data frames
    const acceptKey = req.headers['sec-websocket-key'];
    const hash = generateAcceptValue(acceptKey);
    const responseHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${hash}`
    ];

    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');

    // From here, you would need to handle the WebSocket data frames, which is non-trivial
    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        // Here you would need to implement the frame parsing and handling
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

function generateAcceptValue(acceptKey) {
    return crypto
        .createHash('sha1')
        .update(acceptKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
        .digest('base64');
}

