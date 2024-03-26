function encodeToBase64(input) {
  // Define the Base64 character set
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  // Convert input string to a buffer
  const buffer = Buffer.from(input);

  // Initialize the result string
  let result = '';

  // Process each 3-byte block from the input
  for (let i = 0; i < buffer.length; i += 3) {
    // Combine the three bytes into a single integer
    const combined = (buffer[i] << 16) | (buffer[i + 1] << 8) | (buffer[i + 2]);

    // Extract each 6-bit block and map it to a Base64 character
    result += base64Chars[(combined >> 18) & 63] + 
              base64Chars[(combined >> 12) & 63] + 
              base64Chars[(combined >> 6) & 63] + 
              base64Chars[combined & 63];
  }

  // Handle padding for the last block, if necessary
  const padding = input.length % 3;
  if (padding === 1) {
    result = result.substring(0, result.length - 2) + '==';
  } else if (padding === 2) {
    result = result.substring(0, result.length - 1) + '=';
  }

  return result;
}

// Example usage
const inputString = "Hello World!";
const encodedString = encodeToBase64(inputString);
console.log(`Input: ${inputString}`);
console.log(`Encoded: ${encodedString}`);

