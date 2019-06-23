# travelerjs  [![Build Status](https://travis-ci.org/fatzchang/travelerjs.svg?branch=master)](https://travis-ci.org/fatzchang/travelerjs)

## Description
It's a frontend router which less than 4KB after minified, write with vanilla javascript and no dependencies.

## Motivation
To build a SPA, we usually use existing framework, but for flexible and controllable purpose, we can also build our own mechanism with less learning curve. Router is one of the most important cores of SPA, that's why travelerjs is born.

## Install
### install with npm
```
npm install --save travelerjs
```


## usage
```js
import { Traveler, Route } from 'travelerjs'; // import the module

const traveler = new Traveler(); // instantiate

traveler.register(new Route('your/path', function() {
    console.log('absolute path hit');
})); // register the routes

traveler.listen(); // check the current route (optional)
```

### and you are ready to go!
```js
traveler.go('your/path');
```

## APIs
### traveler
| Method | Arguments | Description |
| :----: | :-------: | :---------: |
| `listen` |  | check if current url match the existing route |
| `register` | instance of Route | register the route in list, will check it when a url change event is detected |
| `go` | string(path) | will change the current url without reloading the page |
| `setRoot` | string(path) | default root is `/`, after changed the root, the url path pass to traveler.go will add to the new root directly |

### Route
#### defines the route and what to do when the route is hit
basically, the first argument is a path, and the second one is a callback function.
```js
const home_route = new Route('im/going/home', () => {
    console.log("I arrive home!")
});
traveler.register(home_route)
```
there are also the other way to set the route.
```js
const route = new Route('user/status/@id', (id) => {
    // use id to send ajax blabla
    axios.post('example.com', {id}).then((response) => {
        console.log(response);
    });
});
traveler.register(home_route)
```
it will pass the part of path which has `@` into the callback in order, e.g.
```js
traveler.go('user/status/2'); // this will use '2' as the id and send ajax to get the user's status
```
