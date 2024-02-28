// Example 2: Chaining Promises after a delay

console.log("Program started...");

function delay(ms) {
    console.log("inside the delay function");
    return new Promise(resolve => setTimeout(resolve, ms));
}

function delayedGreeting(name, ms) {
    console.log("Inside the delayedGreeting function");
    return new Promise(resolve => setTimeout(() => resolve("Timeout has resolved"), ms));
}


delayedGreeting("Alice", 2000)
    .then(greeting => console.log(greeting)) // Logs "Hello, Alice!" after 2 seconds
    .then(() => delay(1000)) // Further delay of 1 second
    .then(() => console.log("Another second passed"));

console.log("Program ended.");