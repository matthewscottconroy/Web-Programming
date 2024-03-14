const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Serve static files
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Home page that displays the options
app.get('/', (req, res) => {
  // Read cookies, if they exist
  const color = req.cookies.color || 'white';
  const fontSize = req.cookies.fontSize || '16px';

  res.send(`
    <html>
      <head>
        <title>Cookie Example</title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
        </style>
      </head>
      <body>
        <h1>Welcome!</h1>
        <nav>
          <a href="/page1">Page 1</a> | 
          <a href="/page2">Page 2</a>
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
  // Set cookies
  res.cookie('color', req.body.color, { maxAge: 900000, httpOnly: true });
  res.cookie('fontSize', req.body.fontSize, { maxAge: 900000, httpOnly: true });
  res.redirect('/');
});

// Route for Page 1
app.get('/page1', (req, res) => {
  const color = req.cookies.color || 'white';
  const fontSize = req.cookies.fontSize || '16px';
  res.send(generatePage('Page 1', color, fontSize));
});

// Route for Page 2
app.get('/page2', (req, res) => {
  const color = req.cookies.color || 'white';
  const fontSize = req.cookies.fontSize || '16px';
  res.send(generatePage('Page 2', color, fontSize));
});

// Helper function to generate HTML for Page 1 and Page 2
function generatePage(title, color, fontSize) {
  return `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { background-color: ${color}; font-size: ${fontSize}; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <nav>
          <a href="/">Home</a> | 
          <a href="/page1">Page 1</a> | 
          <a href="/page2">Page 2</a>
        </nav>
      </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

