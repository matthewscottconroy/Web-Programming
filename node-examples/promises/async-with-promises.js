// Example of an async function that uses await to wait for a promise to resolve
import fetch from 'node-fetch';
//const fetch = require('node-fetch');

console.log("Program has started.");

async function fetchWithDelay(url, delay) {
    console.log("Inside the fetchWithDelay function.");

    // Simulating a delay
    console.log("Before first await.");
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log("After first await.");

    // Fetch data from the URL
    console.log("Before second await.");
    const response = await fetch(url);
    console.log("After second await.");

    // Wait for the response to be converted to JSON
    console.log("Before third await.");
    const data = await response.json();
    console.log("After third await.");

    // Return the data
    return data;
}


// Using the async function
console.log("Before fetchWithDelay function call.");
fetchWithDelay('https://jsonplaceholder.typicode.com/todos/1', 1000)
    .then(data => console.log(data)) // Handling resolved promise
    .catch(error => console.error(error)); // Handling rejected promise or errors
console.log("After fetchWithDelay function call.");






//Other examples...


// Example of error handling with try...catch in an async function
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch: ${error.message}`);
        // Optionally, rethrow the error or handle it accordingly
    }
}

// Example of parallel execution with Promise.all
async function fetchMultipleUrls(urls) {
    try {
        // Promise.all waits for all promises to resolve or any to reject
        const results = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
        return results;
    } catch (error) {
        console.error(`One or more requests failed: ${error}`);
    }
}

