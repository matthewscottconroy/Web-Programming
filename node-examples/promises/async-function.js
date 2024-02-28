// Async Function Example: Using async/await with setTimeout Promises for sequential delays
console.log("Program has started.");

function delay(ms) {
    console.log("inside the function");
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sequentialDelays() {
    console.log("Inside function");
    
    await delay(1000);
    console.log("First delay done");
    await delay(1500);
    console.log("Second delay done");
}

console.log("Before function call");
sequentialDelays();
console.log("After function call.");

console.log("Program has ended.");