const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Load the private key
const privateKey = fs.readFileSync('server.key', 'utf8');

function decryptFile(encryptedFilePath, decryptedFilePath) {
  const encryptedData = fs.readFileSync(encryptedFilePath);
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
    },
    encryptedData
  );

  // Write the decrypted data to a file or process as needed
  fs.writeFileSync(decryptedFilePath, decryptedData);
  console.log('File decrypted and saved to:', decryptedFilePath);
}

// Command line arguments
const encryptedFilePath = process.argv[2];
const decryptedFilePath = process.argv[3];

// Validate arguments
if (!encryptedFilePath || !decryptedFilePath) {
  console.log('Usage: node decrypt.js <input file> <output file>');
  process.exit(1);
}

decryptFile(encryptedFilePath, decryptedFilePath);

