# Assignment 4 - Job Application Tracker 

### Answers to Questions

**1. Difference between getElementById, getElementsByClassName, and querySelector?**
- `getElementById`: Selects a single element by its unique ID. It is the fastest method.
- `getElementsByClassName`: Returns a live HTMLCollection of all elements with a specific class.
- `querySelector`: A versatile tool that selects the first element matching a CSS selector (ID, class, or tag).
- `querySelectorAll`: Selects all matching elements and returns them as a static NodeList.

**2. How to create and insert a new element into the DOM?**

First, we create an element using `document.createElement('tagName')`. Then, we can add content using `innerText` or `innerHTML`. Finally, we insert it into the DOM using `appendChild()` (to add it as the last child) or `insertBefore()` (to place it before a specific element).

**3. What is Event Bubbling?**

Event Bubbling is a way of event propagation in the HTML DOM. When an event happens on an element (like a button click), the event first runs on the button, then bubbles up to its parent, then to the grandparent, and so on, until it reaches the `window` object.

**4. What is Event Delegation and why is it useful?**

Event Delegation is a technique where we add a single event listener to a parent element instead of adding multiple listeners to every child. It is useful because it saves memory and works perfectly for dynamic elements that are added to the UI later.

**5. difference between preventDefault() and stopPropagation()?**
- `preventDefault()`: Stops the default browser behavior of an element (like preventing a link from opening or a form from refreshing).
- `stopPropagation()`: Stops the event from bubbling up to parent elements, preventing their event listeners from firing.
