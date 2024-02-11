const express = require('express');
const app = express();
const port = 3000;

// Sample data simulating a database
const people = [
  { firstname: 'Homer', lastname: 'Thomas', gender: 'male', smoker: false, age: 40 },
  { firstname: 'Janet', lastname: 'Sanchez', gender: 'female', smoker: true, age: 25 },
  { firstname: 'Sarasti', lastname: 'Smith', gender: 'male', smoker: true, age: 28 },
  { firstname: 'Mike', lastname: 'Smith', gender: 'male', smoker: false, age: 25 },
  { firstname: 'Homer', lastname: 'Smith', gender: 'male', smoker: false, age: 28 },
  { firstname: 'Samantha', lastname: 'Wright', gender: 'female', smoker: true, age: 31 },
  { firstname: 'Barbara', lastname: 'Thomas', gender: 'female', smoker: false, age: 5 },
  { firstname: 'Beetlejuice', lastname: 'Beetlejuice', gender: 'male', smoker: true, age: 89 },
  { firstname: 'Mike', lastname: 'Judge', gender: 'male', smoker: false, age: 40 },
  // Add more people as needed
];

app.get('/search', (req, res) => {
  const { firstname, lastname, gender, smoker, age } = req.query;

  // Filter the people array based on query parameters
  const filteredPeople = people.filter(person => {
    return (!firstname || person.firstname === firstname) &&
           (!lastname || person.lastname === lastname) &&
           (!gender || person.gender === gender) &&
           (smoker === undefined || person.smoker === (smoker === 'true')) &&
           (!age || person.age === Number(age));
  });

  // Return the filtered list as a JSON response
  res.json(filteredPeople);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

