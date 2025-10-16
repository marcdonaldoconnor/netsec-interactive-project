// script.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Example: Button click handler
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button was clicked!');
        });
    }
});

// Example function
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// Export for testing or modular use (if using modules)
// export { sayHello };
