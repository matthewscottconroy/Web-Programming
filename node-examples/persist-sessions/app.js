const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Use express-session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Home page that displays the options
app.get('/', (req, res) => {
	const { color = 'white', fontSize = '16px' } = req.session;
  res.send(`
    <html>
		  <head>
        <title> Home </title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
				</style>
			</head>
			<body>
      <h1>Welcome!</h1>
        <nav>
          <a href="/page1"> Page 1</a> | 
					<a href="/page2"> Page 2</a> |
					<a href="/"> Home </a> |
					<a href="/form"> Form </a> 
				</nav>
      <p>Customize your page:</p>
    </body>
	`);
});

//form for setting options
app.get('/form', (req, res) => {
  const { color = 'white', fontSize = '16px' } = req.session;
  res.send(`
    <html>
      <head>
        <title>Session Example</title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
        </style>
      </head>
      <body>
        <h1>Form!</h1>
				<nav>
          <a href="/page1"> Page 1</a> | 
					<a href="/page2"> Page 2</a> |
					<a href="/"> Home </a> |
					<a href="/form"> Form </a> 
				</nav>
        <p>Customize your page:</p>
        <form action="/customize" method="post">
          <label for="color">Background Color:</label>
          <input type="text" id="color" name="color" value="${color}">
          <label for="fontSize">Font Size:</label>
          <input type="text" id="fontSize" name="fontSize" value="${fontSize}">
          <button type="submit">Apply</button>
        </form>
      </body>
    </html>
  `);
});

// Route to customize session options
app.post('/customize', (req, res) => {
  const { color, fontSize } = req.body;
  req.session.color = color;
  req.session.fontSize = fontSize;
  res.redirect('/');
});

// Route for Page 1
app.get('/page1', (req, res) => {
  const { color = 'white', fontSize = '16px' } = req.session;
  res.send(`
    <html>
      <head>
        <title>Page 1</title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
        </style>
      </head>
      <body>
        <h1>Page 1</h1>
        <nav>
          <a href="/page1"> Page 1</a> | 
					<a href="/page2"> Page 2</a> |
					<a href="/"> Home </a> |
					<a href="/form"> Form </a> 
				</nav>
				<p> Page 1 you are on. </p>
      </body>
    </html>
  `);
});

// Route for Page 2
app.get('/page2', (req, res) => {
  const { color = 'white', fontSize = '16px' } = req.session;
  res.send(`
    <html>
      <head>
        <title>Page 2</title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
        </style>
      </head>
      <body>
        <h1>Page 2</h1>
        <nav>
          <a href="/page1"> Page 1</a> | 
					<a href="/page2"> Page 2</a> |
					<a href="/"> Home </a> |
					<a href="/form"> Form </a> 
				</nav>
				<p> Welcome to page 2</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

