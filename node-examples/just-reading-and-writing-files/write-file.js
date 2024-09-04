const fs = require('fs');

// Get the argument passed to the script (node writeFile.js "Your content here")
const content = process.argv[2];

// Specify the file path
const filePath = './output.txt';

// Check if content is provided
if (!content) {
  console.error('Please provide content to write to the file.');
  process.exit(1);
}

// Write the content to a file asynchronously
fs.writeFile(filePath, content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
    return;
  }

  console.log(`Content written to ${filePath}`);
});

