const assert = require('assert');

import helper from '../src/helper';

describe('#trim', function() {
  it('should remove "/" from head and tail', function(done) {
    assert(helper.trim('/a/b') === 'a/b');
    assert(helper.trim('a/b/') === 'a/b');
    assert(helper.trim('/a/b/c/') === 'a/b/c');
    assert(helper.trim('///a/') === 'a');
    assert(helper.trim('/a///') === 'a');
    assert(helper.trim('') === '');

    done();
  });
});