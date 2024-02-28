// Example 5: Using Promise.all with setTimeout for parallel execution
console.log("Program has started.");

function delayWithValue(value, ms) {
    console.log("Inside function");
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

console.log("Before Promise.all");
Promise.all([
    delayWithValue("Value 1", 1000),
    delayWithValue("Value 2", 500),
    delayWithValue("Value 3", 1500)
]).then(values => console.log(values)); // Logs ["Value 1", "Value 2", "Value 3"] in order after the longest delay
console.log("After Promise.all");


console.log("Program has ended.");