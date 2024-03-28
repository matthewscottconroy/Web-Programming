const jwt = require('jsonwebtoken');

// Function to generate a JWT
function generateJWT(payload, secretKey) {
  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: '1h' });
  return token;
}

// Main code to take payload and secret key from command line arguments
const args = process.argv.slice(2); // Skip the first two elements

if (args.length !== 2) {
  console.error('Usage: node generate-token.js <payload as JSON> <secret key>');
  process.exit(1);
}

const payload = JSON.parse(args[0]);
const secretKey = args[1];

try {
  const token = generateJWT(payload, secretKey);
  console.log('Generated JWT:', token);
} catch (error) {
  console.error('Error generating JWT:', error.message);
}

