// The decodeFromBase64 function definition
function decodeFromBase64(encodedInput) {
    return Buffer.from(encodedInput, 'base64').toString('utf-8');
}

// Main program
function main() {
    // Check if the user provided input
    if (process.argv.length < 3) {
        console.error('Usage: node decode.js "<base64 encoded text>"');
        process.exit(1);
    }

    // Extract the Base64-encoded text from command line arguments
    const encodedText = process.argv.slice(2).join(" ");

    // Decode the Base64-encoded text
    const decodedText = decodeFromBase64(encodedText);

    // Print the decoded text to the console
    console.log(`Decoded Text: ${decodedText}`);
}

// Run the main program
main();

