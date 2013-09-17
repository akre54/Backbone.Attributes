require("chai").should();
global._ = require('underscore');
global.Backbone = require('backbone');
require('../backbone.attributes');

describe('Backbone.Attributes', function() {
  it('should work with plain objects', function() {
    var obj = _.extend({}, Backbone.Attributes);

    obj.on('change:name', function(ctx, title) {
      ctx.should.equal(obj);
      this.should.equal(obj);
      title.should.equal('foo');
    });
    obj.set('name', 'foo');
  });
});