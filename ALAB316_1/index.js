import "./styles.css";

// Menu data structure
var menuLinks = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '/catalog' },
  { text: 'orders', href: '/orders' },
  { text: 'account', href: '/account' },
];

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

/*  Next, create a blank menu bar that we can use to later add some interactivity to the page:
    Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
    Set the height of the topMenuEl element to be 100%.
    Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
    Add a class of flex-around to topMenuEl.
*/

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

//  Part 3

/*  Now that the menu bar is styled, we can add some menu links to it.
    Iterate over the menuLinks array and for each "link" object:
    Create an <a> element.
    On the new element, add an href attribute with its value set to the href property of the "link" object.
    Set the new element's content to the value of the text property of the "link" object.
    Append the new element to the topMenuEl element.
*/

