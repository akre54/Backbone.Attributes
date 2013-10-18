require("chai").should();
global._ = require('underscore');
global.Backbone = require('backbone');
require('../backbone.attributes');

describe('Backbone.Attributes', function() {
  it('should work with plain objects', function() {
    var obj = _.defaults({}, Backbone.Attributes);

    obj.on('change:name', function(ctx, name) {
      ctx.should.equal(obj);
      this.should.equal(obj);
      name.should.equal('Curly');
    });
    obj.setAttribute('name', 'Curly');
  });

  it('should work with defaults', function() {
    var obj = {
      defaults: {
        name: 'Moe'
      }
    };
    obj = _.defaults(obj, Backbone.Attributes);

    obj.getAttribute('name').should.equal('Moe');
    obj.on('change:name', function(ctx, name) {
      name.should.equal('Curly');
      this.getAttribute('name').should.equal(name);
    });
    obj.setAttribute('name', 'Curly');
  });

  it('should not collide with Backbone.Collection methods', function() {
    var col = _.defaults(new Backbone.Collection, Backbone.Attributes);

    col.get.should.equal(Backbone.Collection.prototype.get);
    col.on('change:name', function(ctx, name) {
      ctx.should.equal(col);
      this.should.equal(col);
      name.should.equal('Curly');
      this.getAttribute('name').should.equal(name);
    });
    col.setAttribute('name', 'Curly');
  });

  it('should accept a validate method', function() {
    var obj = {
      validate: function(attrs) {
        if (attrs.name === 'Curly') return "Nope";
      }
    };

    _.defaults(obj, Backbone.Attributes);

    obj.setAttribute({name: 'Curly'});
    obj.isValid().should.equal(false);
    obj.validationError.should.equal("Nope");

    obj.setAttribute({name: 'Moe'});
    obj.isValid().should.equal(true);
  });
});