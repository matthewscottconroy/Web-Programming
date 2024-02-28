// Example 1: Basic usage of setTimeout with Promises
console.log("Program started");

function delay(ms) {
    console.log("inside the function");
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Before function call");
delay(1000).then(() => console.log("Resolution function has happened."));
console.log("After function call.");

console.log("Program ended.");