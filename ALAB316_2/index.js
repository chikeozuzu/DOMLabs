import "./styles.css";

// The goal of this lab is to demonstrate interaction with the BOM and manipulation of the DOM through JavaScript, 
// so directly modifying the HTML or CSS files to statically add dynamic content is counterproductive.

//  Part 1

/*  Create a simple guessing game that pushes users toward the correct answer in some iterative way. The game does not need to be practical or complicated.
    Use window object methods to gather input from the user and display information to the user.
    Use DOM manipulation to give a visual indication of the game's progress in some way.
    Use comments to explain your code.
*/

// Set a random number between 1 and 100 as the correct answer
const correctNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessedCorrectly = false;