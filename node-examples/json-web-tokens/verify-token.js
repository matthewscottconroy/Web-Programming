const jwt = require('jsonwebtoken');

// Function to verify a JWT
function verifyJWT(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    console.log('Token is valid. Payload:', decoded);
  } catch (error) {
    console.error('Invalid token:', error.message);
  }
}

// Main code to take JWT and secret key from command line arguments
const args = process.argv.slice(2); // Skip the first two elements

if (args.length !== 2) {
  console.error('Usage: node verifyJWT.js <JWT> <secret key>');
  process.exit(1);
}

const token = args[0];
const secretKey = args[1];

verifyJWT(token, secretKey);

