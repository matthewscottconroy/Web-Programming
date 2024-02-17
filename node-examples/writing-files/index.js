const express = require('express');

const app = express();
const port = 3000;

const fs = require('fs');



app.get('/append-to-file', (req, res) => {
  const { firstname, lastname, gender, smoker, age } = req.query;

  // Format the data as a CSV string. Assuming your CSV has headers like name,age,smoker,gender,color,meal
  const csvLine = `\n"${firstname}",${lastname},${gender},"${smoker}","${age}"`;

  // Append the formatted data to your CSV file
  fs.appendFile('people.csv', csvLine, (err) => {
    if (err) {
      console.error('Error appending to CSV', err);
      return res.status(500).send('Error saving your details');
    }
    res.send(`
      Received your details!<br>
      FirstName: ${firstname}<br>
      Lastname: ${lastname}<br>
      Gender: ${gender}<br>
      Smoker: ${smoker}<br>
      Age: ${age}<br>
    `);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

