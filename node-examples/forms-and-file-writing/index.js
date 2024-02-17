const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const fs = require('fs');
const csvParser = require('csv-parser');


// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a form at the root route
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit-form" method="post">
      <label for="firstname">FirstName:</label><br>
      <input type="text" id="firstname" name="firstname"><br>

      <label for="lastname">LatName:</label><br>
      <input type="text" id="lastname" name="lastname"><br>
      
      <label for="age">Age:</label><br>
      <input type="text" id="age" name="age"><br>
      
      <p>Are you a smoker?</p>
      <input type="radio" id="smoker" name="smoker" value="Yes">
      <label for="smoker">Yes</label><br>
      <input type="radio" id="non-smoker" name="smoker" value="No" checked>
      <label for="non-smoker">No</label><br>
      
      <p>Gender:</p>
      <input type="radio" id="male" name="gender" value="Male">
      <label for="male">Male</label><br>
      <input type="radio" id="female" name="gender" value="Female">
      <label for="female">Female</label><br>
      <input type="radio" id="other" name="gender" value="Other">
      <label for="other">Other</label><br>
      
      <label for="color">Favorite Color:</label><br>
      <input type="color" id="color" name="color"><br>
      
      <label for="meal">Last Meal Preference:</label><br>
      <select id="meal" name="meal">
        <option value="pizza">Pizza</option>
        <option value="hot_wings">Hot Wings</option>
        <option value="spaghetti">Spaghetti</option>
        <option value="chicken_soup">Chicken Soup</option>
      </select><br><br>
      
      <input type="submit" value="Submit">
    </form> 
  `);
});

app.post('/submit-form', (req, res) => {
  const { firstname, lastname, age, smoker, gender, color, meal } = req.body;

  // Format the data as a CSV string. Assuming your CSV has headers like name,age,smoker,gender,color,meal
  const csvLine = `\n"${firstname}","${lastname}","${gender}",${smoker},${age},"${color}","${meal}"`;

  // Append the formatted data to your CSV file
  fs.appendFile('people.csv', csvLine, (err) => {
    if (err) {
      console.error('Error appending to CSV', err);
      return res.status(500).send('Error saving your details');
    }
    res.send(`
      Received your details!<br>
      FirstName: ${firstname}<br>
			LastName: ${lastname}<br>
      Age: ${age}<br>
      Smoker: ${smoker}<br>
      Gender: ${gender}<br>
      Favorite Color: ${color}<br>
      Last Meal Preference: ${meal}
    `);
  });
});



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

app.get('/searchCSV', async (req, res) => {
  try {
    const people = await readDataFromCSV();
    const filteredPeople = filterPeople(req.query, people);
    res.json(filteredPeople);
  } catch (error) {
    res.status(500).send('Error reading from CSV file');
  }
});

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

