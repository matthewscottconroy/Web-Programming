//Import the express library
const express = require("express");

const app = express(); //Create an instance of the express web server
const port = 3000; //the port the program will listen on

//The route to visit to get an http response
app.get("/greet",(req,res) => {
  res.send("Hello world!");
});

//Set the express server to begin running
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
