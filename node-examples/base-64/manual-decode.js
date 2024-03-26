function decodeBase64(encodedString) {
    // Base64 character set, minus the '+' and '/'.
    const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    
    // Convert the Base64 string to a character array.
    const chars = encodedString.split('');

    // Prepare an array to hold the decoded bytes.
    let bytes = [];

    // Process each 4 characters into 3 bytes.
    for (let i = 0; i < chars.length; i += 4) {
        // Find the index in the Base64 character set, then convert it to 6-bit binary representation.
        const indexes = chars.slice(i, i + 4).map(char => base64Chars.indexOf(char).toString(2).padStart(6, '0'));
        
        // Combine the 6-bit groups into 24 bits (as a string) then split that into 3 8-bit groups.
        const binString = indexes.join('');
        const byteStrings = binString.match(/.{1,8}/g) || [];
        
        // Convert each 8-bit binary string to a decimal number (byte) and add to the result array.
        bytes.push(...byteStrings.map(bin => parseInt(bin, 2)));
    }

    // Convert the byte array back into a string.
    return String.fromCharCode(...bytes);
}

// Example usage:
const encodedString = "SGVsbG8gV29ybGQh"; // "Hello World!"
const decodedString = decodeBase64(encodedString);
console.log(decodedString); // Outputs: Hello World!

