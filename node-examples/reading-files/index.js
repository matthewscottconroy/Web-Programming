const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const port = 3000;

// Function to read data from CSV file
const readDataFromCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('people.csv')
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results.map(person => ({
          ...person,
					smoker: person.smoker === 'true',
          age: parseInt(person.age, 10)
        })));
      })
      .on('error', reject);
  });
};

// Function to read data from JSON file
const readDataFromJSON = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('people.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

app.get('/searchCSV', async (req, res) => {
  try {
    const people = await readDataFromCSV();
    const filteredPeople = filterPeople(req.query, people);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).send('Error reading from CSV file');
  }
});

app.get('/searchJSON', async (req, res) => {
  try {
    const people = await readDataFromJSON();
    const filteredPeople = filterPeople(req.query, people);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).send('Error reading from JSON file');
  }
});

// Refactored filtering logic into a function
const filterPeople = (queryParams, people) => {
  const { firstname, lastname, gender, smoker, age } = queryParams;
  return people.filter(person => {
    return (!firstname || person.firstname === firstname) &&
           (!lastname || person.lastname === lastname) &&
           (!gender || person.gender === gender) &&
           (smoker === undefined || person.smoker === (smoker === 'true')) &&
           (!age || person.age === Number(age));
  });
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

