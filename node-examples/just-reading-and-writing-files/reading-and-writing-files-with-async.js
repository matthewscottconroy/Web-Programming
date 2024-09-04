const fs = require('fs').promises;

// Specify the file paths
const readFilePath = './input.txt';
const writeFilePath = './output.txt';

async function readAndWriteFile() {
  try {
    // Read the file asynchronously
    const data = await fs.readFile(readFilePath, 'utf8');
    console.log('File content:', data);

    // Modify the content or use it as-is and write to another file
    const newContent = `${data}\nAppended new content!`;

    // Write the new content to the output file asynchronously
    await fs.writeFile(writeFilePath, newContent, 'utf8');
    console.log(`New content written to ${writeFilePath}`);
  } catch (err) {
    // Handle any errors that occur during reading or writing
    console.error('An error occurred:', err.message);
  }
}

// Call the async function
readAndWriteFile();

