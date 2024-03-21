const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(cookieParser());


// In-memory user store
const users = [
    { id: 1, username: "user1", password: "password1" } // Passwords should be hashed in a real application
];

const jwtSecret = 'yourSecretKey'; // This should be stored securely

// Middleware to authenticate JWT
/*
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
*/

const authenticateJWT = (req, res, next) => {
	  console.log("authenticateJWT middleware is running");
	  const token = req.cookies['accessToken'];  

    if (token == null) {
			  console.log("Token was not supplied");
        // Redirect to login page, include the originally requested URL as a query parameter
        const returnUrl = encodeURIComponent(req.originalUrl);
			  console.log("ReturnUrl is: ", returnUrl);
			  console.log("Redirecting to login-page");
        return res.redirect(`/login-page?returnUrl=${returnUrl}`);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
			  console.log("Verifying token...");
        if (err) {
					  console.log("Jwt verify had an error:", err);
            const returnUrl = encodeURIComponent(req.originalUrl);
            return res.redirect(`/login-page?returnUrl=${returnUrl}`);
        }
        req.user = user;
			  console.log("User verified!");
        next();
    });
};



app.get('/login-page', (req, res) => {
	  console.log("Hit login page route.");
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login route
/*app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const accessToken = jwt.sign({ username: user.username, id: user.id }, jwtSecret);
        res.json({ accessToken });
    } else {
        res.send('Username or password incorrect');
    }
});
*/
app.post('/login', (req, res) => {
	  console.log("Hit login route and processing request to log in.");
    const { username, password, returnUrl } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
			  console.log("User found, generating token...");
        const accessToken = jwt.sign({ username: user.username, id: user.id }, jwtSecret);

			  res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'strict' });

			  // Redirect to the returnUrl or a default page if not specified
        const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/home';
			  console.log("At login route, the decoded redirectUrl is: ", redirectUrl);
        res.redirect(redirectUrl);
    } else {
        // Optionally, you could append an error message in the query string to display on the login page
			  console.log("User was not found");
        res.redirect('/login-page');
    }
});


// Protected routes
app.get('/home', authenticateJWT, (req, res) => {
	  console.log("Hit home route.");
    res.json({ content: "This page talks about HTTP response codes related to access." });
});

app.get('/info', authenticateJWT, (req, res) => {
	  console.log("Hit info route.");
    res.json({ content: "This page explains how JSON Web Tokens work and what is stored in them." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

