const assert = require('assert');

import { Traveler, Route } from '../src/traveler';

describe('#register', function() {
  const traveler = new Traveler();
  const route = new Route('@a/@b/@c', (a, b, c) => {

  });

  it('param must be instance of Route', function(done) {
    assert(traveler.register(route) === true);
    assert(traveler.register('string') === false);
    assert(traveler.register(['a', 'b']) === false);
    assert(traveler.register({}) === false);
    assert(traveler.register(undefined) === false);

    done();
  });

  it('instance of Route should return errow', function(done) {
    const result = traveler.register(route);
    assert(result);
    done();
  });

  it('should push into routes', function(done) {
    traveler.register(route);
    assert((traveler.routes[traveler.routes.length - 1] === route));
    done();
  });

  it('should remove "/" from head and tail', function(done) {
    assert(Traveler.trim('/a/b') === 'a/b');
    assert(Traveler.trim('a/b/') === 'a/b');
    assert(Traveler.trim('/a/b/c/') === 'a/b/c');
    assert(Traveler.trim('') === '');
    done();
  });
});