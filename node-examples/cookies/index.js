const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// Route: Set a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "JohnDoe", {
    httpOnly: true, // Prevents JavaScript access
    secure: false,  // Set to true in production with HTTPS
    maxAge: 60000,  // Expires in 60 seconds
  });
  res.send("Cookie has been set!");
});

// Route: Read the cookie
app.get("/read-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Hello, ${username}!`);
  } else {
    res.send("No cookie found.");
  }
});

// Route: Clear the cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie has been cleared.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

