const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const Mayor = require('./Mayor');
const City = require('./City');


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/weatherData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Create a mayor
app.post('/mayors', async (req, res) => {
  const { firstname, lastname, birthdate, political_party, terms_served } = req.body;
  try {
    const mayor = new Mayor({ firstname, lastname, birthdate, political_party, terms_served });
    await mayor.save();
    res.status(201).send(mayor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all mayors
app.get('/mayors', async (req, res) => {
  try {
    const mayors = await Mayor.find();
    res.status(200).send(mayors);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/cities', async (req, res) => {
  const { name, years } = req.body;
  try {
    const city = new City({ name, years });
    await city.save();
    res.status(201).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/cities', async (req, res) => {
  try {
    const cities = await City.find().populate('years.mayor'); // Optionally populate the mayor details
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/cities/:cityId/years', async (req, res) => {
  const { cityId } = req.params;
  const yearData = req.body; // Assuming yearData contains the structure for a year's data
  
  try {
    // Find the city by ID and add the new year data to its years array
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    city.years.push(yearData);
    await city.save();
    res.status(201).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/cities/:cityId/years', async (req, res) => {
  const { cityId } = req.params;

  try {
    const city = await City.findById(cityId, 'years');
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send(city.years);
  } catch (error) {
    res.status(500).send(error);
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

