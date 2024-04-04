const express = require('express');
const app = express();

// Middleware that logs the request path
const loggerMiddleware = (req, res, next) => {
  console.log(`Request received for path: ${req.path}`);
  next();
};

// Using a regular expression to match routes
// For example, this matches any route that starts with /api/

app.use(/^\/api/, loggerMiddleware);
//app.use('/api/users', loggerMiddleware);

// Define routes
app.get('/api/users', (req, res) => {
  res.send('Users API');
});

app.get('/api/products', (req, res) => {
  res.send('Products API');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

