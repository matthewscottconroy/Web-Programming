const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const jwtSecret = 'OurSecretKey';

const authenticateJWT = (req, res, next) => {
  console.log("The token validation has begun...");

	const authHeader = req.headers.authorization;

	if (!authHeader) return res.sendStatus(401);

	//'Authorization: Bearer sdjkdfjkskjsdfkjk'
	const token = authHeader.split(' ')[1];

	jwt.verify(token,  jwtSecret, (err, user) => {
    if(err) return res.sendStatus(403);
		req.user = user;
	  
		console.log("The token validation is ending...");
		next();
	});
};

  //const token = req.cookies['accessToken'];

const users = [
  {id: 1, username: "user1", password: "password1" }
];



app.get('/login', (req, res) => {
  res.send('<html><body> <h1> Login Page </h1></body></html>');
});

app.get('/hello', authenticateJWT, (req, res) => {
  res.send('<html><body> <h1> Hello World! </h1> </body> </html>');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
