// Example 1: Basic usage of setTimeout with Promises
console.log("Program started");

function delay(ms) {
    console.log("inside the function");
    let f1 = resolve => setTimeout(resolve, ms)
    return new Promise(f1);
}

console.log("Before function call");
let f2 = () => console.log("Resolution function has happened.")
let p = delay(5000)
p.then(f2);
console.log("After function call.");

console.log("Program ended.");