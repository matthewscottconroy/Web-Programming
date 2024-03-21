// Function to decode a JWT
function decodeJWT(token) {
  const parts = token.split('.');
  const header = parts[0];
  const payload = parts[1];

  if (!header || !payload) {
    throw new Error('The token is invalid');
  }

  const decode = (part) => {
    let decoded = Buffer.from(part, 'base64').toString('utf8');
    return JSON.parse(decoded);
  };

  return {
    header: decode(header),
    payload: decode(payload),
    // Signature is not decoded as it's not in a JSON format
  };
}

// Main code to take JWT from command line argument and decode it
const args = process.argv.slice(2); // Skip the first two elements

if (args.length !== 1) {
  console.error('Usage: node decodeJWT.js <JWT>');
  process.exit(1);
}

const token = args[0];
try {
  const decoded = decodeJWT(token);
  console.log('Header:', decoded.header);
  console.log('Payload:', decoded.payload);
} catch (error) {
  console.error('Error decoding JWT:', error.message);
}

