const assert = require('assert');

import lib from '../src/traveler';
const Traveler = lib.Traveler;
const Route = lib.Route;

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
    assert(typeof traveler.notify('') === 'undefined');
    assert(typeof traveler.notify('t')  === 'undefined');
    assert(typeof traveler.notify('t/e')  === 'undefined');
    assert(traveler.notify('t/e/s') instanceof Route);
    assert(typeof traveler.notify('t/e/s/t')  === 'undefined');
    
    done();
  });
});