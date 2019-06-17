const assert = require('assert');

import { Traveler, Route } from '../src/traveler';

describe('#register', function() {
  const traveler = new Traveler();
  const route = new Route('@a/@b/@c', (a, b, c) => {

  });

  it('not instance of Route should failed', function(done) {
    assert(traveler.register(route) === true);
    assert(traveler.register('string') === false);
    assert(traveler.register(['a', 'b']) === false);
    assert(traveler.register({}) === false);
    assert(traveler.register(undefined) === false);
    assert(traveler.register(null) === false);
    assert(traveler.register() === false);

    done();
  });

  it('instance of Route should pass', function(done) {
    const result = traveler.register(route);
    assert(result);
    done();
  });

  it('should push into routes', function(done) {
    traveler.register(route);
    assert((traveler.routes[traveler.routes.length - 1] === route));
    done();
  });
});

describe('#notify', function() {
  const traveler = new Traveler();
  const route = new Route('@a/@b/@c', (a, b, c) => {

  })

  it('should be true if match a route', function(done) {
    traveler.register(route);
    assert(traveler.notify('') === false);
    assert(traveler.notify('t') === false);
    assert(traveler.notify('t/e') === false);
    assert(traveler.notify('t/e/s') === true);
    assert(traveler.notify('t/e/s/t') === false);
    
    done();
  });
});