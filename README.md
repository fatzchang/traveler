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
### step1:
#### import the module
```js
import { Traveler, Route } from 'travelerjs';
```

### step2:
#### instantiate the traveler
```js
const traveler = new Traveler();
```

### step3:
#### register the routes
```js
traveler.register(new Route('your/path', function() {
    console.log('absolute path hit');
}));
```

### step4 (optional):
#### check the current route
```js
traveler.listen();
```

### step4:
#### start traveling
```js
traveler.go('your/path');
```

## API
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
    console.log("I'm home!")
});
```
there are also the other way to set the route.
```js
const home_route = new Route('@who/going/home', (someone) => {
    console.log(`${someone} is at home!`);
});
```
it will pass the part of path which has `@` into the callback in order, e.g.
```js
traveler.go('Mary/going/home'); // this will log Mary is at home in console
```
