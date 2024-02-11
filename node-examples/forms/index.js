const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a form at the root route
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit-form" method="post">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"><br>
      
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

// Process the form data submitted via POST
app.post('/submit-form', (req, res) => {
  const { name, age, smoker, gender, color, meal } = req.body;
  res.send(`
    Received your details!<br>
    Name: ${name}<br>
    Age: ${age}<br>
    Smoker: ${smoker}<br>
    Gender: ${gender}<br>
    Favorite Color: ${color}<br>
    Last Meal Preference: ${meal}
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

