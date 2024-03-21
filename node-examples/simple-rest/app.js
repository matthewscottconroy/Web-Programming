const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/* 
// Uncomment these lines if you would like to enforce basic auth
const basicAuth = require('express-basic-auth');

// Apply Basic Authentication Middleware
app.use(basicAuth({
    users: { 'admin': 'password' }, // Replace with your credentials
    challenge: true,
}));
*/


// In-memory storage for items
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// CRUD Operations

// Create
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).send(newItem);
});

// Read all
app.get('/items', (req, res) => {
  res.send(items);
});

// Read one
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.send(item);
});

// Update
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name;
  res.send(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Item not found');

  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

