// The encodeToBase64 function definition
function encodeToBase64(input) {
    return Buffer.from(input).toString('base64');
}

// Main program
function main() {
    // Check if the user provided input
    if (process.argv.length < 3) {
        console.error('Usage: node encode.js "<text to encode>"');
        process.exit(1);
    }

    // Extract the input text from command line arguments
    const inputText = process.argv.slice(2).join(" ");

    // Encode the input text to Base64
    const encodedText = encodeToBase64(inputText);

    // Print the encoded text to the console
    console.log(`Encoded Text: ${encodedText}`);
}

// Run the main program
main();

