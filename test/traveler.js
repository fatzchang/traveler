const assert = require('assert');

import { Traveler, Route } from '../src/traveler';

describe('#register', function() {
  const traveler = new Traveler();
  const route = new Route('@a/@b/@c', (a, b, c) => {

  });

  it('not instance of Route should return errow', function(done) {
    const result = traveler.register(route);
    assert(result);
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
});