# JSToDo

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Your users should be able to:

- View the optimal layout for the application depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Add new todo items to the list.
- Mark todo items as complete.
- Filter by all / active / complete todo items.
- Clear all completed todo items.

### Screenshot

![](./screenshot.jpg)


### Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- JavaScript
- HTML
- CSS

### What I learned

I would like to preface this project with one statement:  I would not, in any scenario, call myself a front end developer at this time in my career.  The majority of my training in C#, .NET, and SQL.  The front end knowledge I have learned through Grand Circus is remedial HTML/CSS and JavaScript, and more in-depth Angular/Typescript. There were many times when I literally said outloud "If this was Angular, I would know how to do it."  But this challenge was not Angular.  This challenge was JavaScript.
That being said, I am incredibly proud of the code I was able to accomplish.  I started by watching a Youtube video on how to make a todo list with JavaScript.  It enabled me to get basic functionality. 


```js
//Functions to have filtered lists
function completedToDoList(){
    document.getElementById("list").innerHTML = "";
    loadCompleted(listArray);
}


function activeToDoList() {
    document.getElementById("list").innerHTML = "";
    loadActive(listArray);
}

function showAllList() {
    document.getElementById("list").innerHTML = "";
    loadList(listArray);
}
```


### Continued development

JavaScript is a language that I need to learn more about and I'm absolutely eager for the chance.  Starting this project, I had a small amount of vanilla JS experience.  Most of my previous front end coding was done via Angular and Typescript.  I've had a lot of fun learning new things.  I'm sure there are better and more efficient ways to code this project, and I'd love to learn those.

### Useful resources

- [Code Explained Youtube](https://www.youtube.com/watch?v=b8sUhU_eq3g) - This video was useful to helping this JS beginner make a to do list.


**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

Maggie Tamanini



## Acknowledgments

I would like to thank Youtube and Stack Overflow for helping me even get this far on this challenge.  You are the real MVP.

