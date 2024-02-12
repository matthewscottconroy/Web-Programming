const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

// Import routes
require('./routes/index')(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

