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

const myMiddleware = (req, res, next) => {
  console.log("The middleware has ran...");
	next()
}

app.use(myMiddleware);


const users = [
  {id: 1, username: "user1", password: "password1" }
];

const jwtSecret = 'OurSecretKey';


app.get('/login', (req, res) => {
  res.send('<html><body> <h1> Login Page </h1></body></html>');
});

app.get('/hello', (req, res) => {
  res.send('<html><body> <h1> Hello World! </h1> </body> </html>');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
