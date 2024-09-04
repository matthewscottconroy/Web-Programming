const fs = require('fs');

// Specify the file path
const filePath = './nonexistent.txt';

try {
  // Try to read the file synchronously
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('File content:', data);
} catch (err) {
  // Handle the error if reading fails
  console.error('An error occurred while reading the file:', err.message);
}

