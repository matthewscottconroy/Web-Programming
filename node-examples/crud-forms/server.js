const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Simulated Database
let albums = [
  { id: 1, artist: "Radiohead", albumTitle: "OK Computer", year: 1997 },
  { id: 2, artist: "The Beatles", albumTitle: "Abbey Road", year: 1969 }
];


// Route to send the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CRUD Routes
app.get('/albums', (req, res) => {
  res.json(albums);
});

app.post('/albums', (req, res) => {
  const album = req.body;
  album.id = albums.length + 1; // simple ID assignment
  albums.push(album);
  res.status(201).send(album);
});

app.put('/albums/:id', (req, res) => {
  const { id } = req.params;
  const newAlbum = req.body;
  albums = albums.map(album => album.id.toString() === id ? { ...album, ...newAlbum } : album);
  res.send(`Album with ID ${id} has been updated`);
});

app.delete('/albums/:id', (req, res) => {
  const { id } = req.params;
  albums = albums.filter(album => album.id.toString() !== id);
  res.send(`Album with ID ${id} has been deleted`);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

