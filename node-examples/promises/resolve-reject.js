// Example 3: Error handling with Promises and setTimeout
console.log("The program has started.");

function mayFailOperation(success, ms) {
    console.log("Inside function");
    return new Promise((resolve, reject) => setTimeout(() => {
        if (success) {
            resolve("Operation succeeded");
        } else {
            reject("Operation failed");
        }
    }, ms));
}

console.log("Before function call.");
mayFailOperation(false, 1500)
    .then(message => console.log(message))
    .catch(error => console.error(error)); // Logs "Operation failed" after 1.5 seconds
console.log("After function call.");

console.log("The program has ended.");