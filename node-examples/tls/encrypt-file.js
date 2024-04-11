const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Load the public key
const publicKey = fs.readFileSync('server.cert', 'utf8');

function encryptAndSaveFile(originalFilePath, encryptedFilePath) {
  const fileContents = fs.readFileSync(originalFilePath, 'utf8');
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(fileContents));

  // Write the encrypted data to a file
  fs.writeFileSync(encryptedFilePath, encryptedData);
  console.log('File encrypted and saved to:', encryptedFilePath);
}

// Command line arguments
const originalFilePath = process.argv[2];
const encryptedFilePath = process.argv[3];

// Validate arguments
if (!originalFilePath || !encryptedFilePath) {
  console.log('Usage: node encrypt.js <input file> <output file>');
  process.exit(1);
}

encryptAndSaveFile(originalFilePath, encryptedFilePath);

