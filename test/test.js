require("chai").should();
global._ = require('underscore');
global.Backbone = require('backbone');
require('../backbone.attributes');

describe('Backbone.Attributes', function() {
  it('should work with plain objects', function() {
    var obj = _.extend({}, Backbone.Attributes);

    obj.on('change:name', function(ctx, name) {
      ctx.should.equal(obj);
      this.should.equal(obj);
      name.should.equal('foo');
    });
    obj.setAttribute('name', 'foo');
  });

  it('should not collide with Backbone.Collection methods', function() {
    var col = _.extend(new Backbone.Collection, Backbone.Attributes);

    col.on('change:name', function(ctx, name) {
      ctx.should.equal(col);
      this.should.equal(col);
      name.should.equal('foo');
      this.getAttribute('name').should.equal(name);
    });
    col.setAttribute('name', 'foo');
  });
});