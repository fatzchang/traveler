const assert = require('assert');

import Route from '../src/route';

describe('#decide', function() {
  it('should be true if match', function(done) {
    const route = new Route('@a/@b/@c');


    assert(route.decide('te') === false);
    assert(route.decide('te/st') === false);
    assert(route.decide('te/s/t') === true);

    done();
  });

  it('should put the param with @ into callback', function(done) {
    const args_1 = [];
    const args_2 = [];

    const route_1 = new Route('@a/@b/@c', (a, b, c) => {
      args_1.push(a, b, c);
    });

    const route_2 = new Route('@a/@b/@c/@d', (a, b, c, d) => {
      args_2.push(a, b, c, d);
    });

    assert(route_1.decide('f/a/t') === true);
    assert(route_2.decide('t/e/s/t') === true);

    assert(args_1[0] === 'f');
    assert(args_1[1] === 'a');
    assert(args_1[2] === 't');

    assert(args_2[0] === 't');
    assert(args_2[1] === 'e');
    assert(args_2[2] === 's');
    assert(args_2[3] === 't');

    done();
  });

  it('should be true if match then route without @', function(done) {
    const route_1 = new Route('user/@b/@c');
    const route_2 = new Route('user/@b/world');

    assert(route_1.decide('user/hello/world') === true);
    assert(route_1.decide('hello/world/user') === false);
    assert(route_1.decide('user/hello') === false);

    assert(route_2.decide('user/hello/world') === true);
    assert(route_2.decide('user/world/hello') === false);
    assert(route_2.decide('user/hello') === false);

    done();
  });

  it('should ignore route param without @', function(done) {
    const args = [];
    const route = new Route('user/@b/@c', (b, c) => {
      args.push(b, c);
    });    

    assert(route.decide('user/hello/world') === true);
    assert(args[0] === 'hello');
    assert(args[1] === 'world');
    
    done();
  });
});