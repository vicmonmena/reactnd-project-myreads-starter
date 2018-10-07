# About MyReads Project Implementation

## The following image represents a sketch of the design (sumarized) of the HTML and components created for this project:

![myreads](./myreads_vicmonmena.jpg)

# Things to take into account

# About `Switch` from 'react-router-dom'
I've used this module as an alternative to of nested `Routers` (from react-router) and `IndexRouter`:
```js
  <Router path='/'/>
    <IndexRuter component={List}>
    <Router path='/search' component={search}/>
  </Router>
  <Router path='/404' component={NotFound}/>
```

## About `Refs` HTML elements
I've used this functionality previously to this course and I think is the most elegant way to refer to an HTML element to catch their properties: https://reactjs.org/docs/refs-and-the-dom.html

## About `Third-party dependency`

- I couldn't find anything about this so I've decided to use [Lodash](https://lodash.com/)

# About this version (1.2.0)

Now, we can see more details about books just clicking on them.

There is an important change here: ListItem component now is Smart instead functional, in order to manage Modal state (visible/not visible).

# About version 1.1.0
This version just include a couple of simple components: `ModalContainer' and Modal uses toalerts about some action occurered in the application.

## ModalContainer 

This component is based on `PORTAL` concept of react:
```js
import { createPortal } from 'react-dom'
```
 
 This component renderize and HTML element located at the same level of 'root' div inside (index.html)[./public/index.html] file:

 ```html
  <body>
    <div id="root"></div>
    <div id="modal-container"></div>
  </body>
 ```

## Modal

This is a functional component that shows Modal content.

This component use `{props.children}`in order to load any HTML code pased when is invoke. In example:

```html
  <Modal>
    <h1>Hello world!</h1>
  </Modal>
```

In this project, there is two ways to show modals:

1. From search view: if an error happens searching (i.e.: try to search 'Needful').
1. From search view: if a book is moved to any list.
