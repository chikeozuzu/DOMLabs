import "./styles.css";

/*  DOM manipulation focusing on adding static elements created with JavaScript without modifying
    any of the content of the index.html or styles.css files.
*/

//  Part 1

/*  Start the project by building a main content element using the following steps:
    Select and cache the <main> element in a variable named mainEl.
    Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
        Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
    Set the content of mainEl to <h1>DOM Manipulation</h1>.
    Add a class of flex-ctr to mainEl.
        Hint: Use the Element.classList API.
*/

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

//  Part 2

/*