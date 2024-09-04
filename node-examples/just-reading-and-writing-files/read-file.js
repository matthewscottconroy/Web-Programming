const fs = require('fs');

// Specify the file path
const filePath = './example.txt';

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Print the file content to stdout
  console.log(data);
});

