const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static('public'));

const JWT_SECRET = 'your_secret_key'; // Use a secure key in production

let users = {}; // This will store users as {username: passwordHash}

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.send({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = users[username];
    if (!hashedPassword || !await bcrypt.compare(password, hashedPassword)) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    res.send({ token });
});

app.get('/', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.sendFile(__dirname + '/login.html');
    }
    try {
        jwt.verify(token, JWT_SECRET);
        res.sendFile(__dirname + '/index.html');
    } catch {
        res.status(403).send({ message: 'Invalid or expired token' });
    }
});

io.use((socket, next) => {
    const token = socket.handshake.query.token;
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.username = decoded.username;
        next();
    });
});

io.on('connection', (socket) => {
    console.log(`${socket.username} connected`);
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.username}: ${msg}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

