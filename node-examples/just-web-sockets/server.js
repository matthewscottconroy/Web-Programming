const express = require('express');
const http = require('http');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);

// Store all active connections
const clients = new Set();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.on('upgrade', (req, socket, head) => {
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }

    const acceptKey = req.headers['sec-websocket-key'];
    const hash = generateAcceptValue(acceptKey);
    const responseHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${hash}`
    ];

    socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');

    clients.add(socket);
    console.log('Added client. Total clients:', clients.size);

    socket.on('data', (dataBuffer) => {
        const message = parseWebSocketFrame(dataBuffer);
        if (message) {
            console.log('Received:', message);
            // Broadcast message to all clients
            for (const client of clients) {
							  console.log('client.OPEN value is: ', client.OPEN);
							  console.log('Client state:', client.readyState);
                if (client.readyState === 'open') {  // Check if the connection is still open
									  console.log('Sending message:', message);
                    sendTextData(client, message);
                }
            }
        }
    });

    socket.on('close', () => {
        clients.delete(socket);
        console.log('Removed client. Total clients:', clients.size);
    });
});

function generateAcceptValue(acceptKey) {
    return crypto
        .createHash('sha1')
        .update(acceptKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
        .digest('base64');
}

function sendTextData(socket, data) {
    const buffer = Buffer.from(data, 'utf8');
    const length = buffer.length;
    let frame = [0x81]; // Set FIN bit and text frame type

    if (length <= 125) {
        frame.push(length);
    } else if (length < 65536) {
        frame.push(126, (length & 0xFF00) >> 8, length & 0xFF);
    } else {
        frame.push(127);
        for (let i = 7; i >= 0; --i) {
            frame.push((length & (0xFF << (i * 8))) >> (i * 8));
        }
    }

    frame = Buffer.concat([Buffer.from(frame), buffer]);
    socket.write(frame);
}

function parseWebSocketFrame(dataBuffer) {
    let payloadLength = dataBuffer[1] & 0x7F;
    let maskOffset = 2;
    if (payloadLength === 126) {
        payloadLength = dataBuffer.readUInt16BE(2);
        maskOffset = 4;
    } else if (payloadLength === 127) {
        payloadLength = dataBuffer.readUInt32BE(2) * 4294967296 + dataBuffer.readUInt32BE(6);
        maskOffset = 10;
    }

    const maskingKey = dataBuffer.slice(maskOffset, maskOffset + 4);
    const payload = dataBuffer.slice(maskOffset + 4, maskOffset + 4 + payloadLength);

    for (let i = 0; i < payload.length; i++) {
        payload[i] ^= maskingKey[i % 4];
    }

    return payload.toString('utf8');
}

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

