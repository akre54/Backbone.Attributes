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
    obj.set('name', 'Curly');
  });

  it('should work with defaults', function() {
    var obj = {
      defaults: {
        name: 'Moe'
      }
    };
    _.defaults(obj, Backbone.Attributes);

    obj.get('name').should.equal('Moe');
    obj.on('change:name', function(ctx, name) {
      name.should.equal('Curly');
      name.should.equal(this.get('name'));
    });
    obj.set('name', 'Curly');
  });

  it('should not collide with Backbone.Collection methods', function() {
    var col = _.defaults(new Backbone.Collection, Backbone.Attributes);

    col.get.should.equal(Backbone.Collection.prototype.get);
    col.set.should.equal(Backbone.Collection.prototype.set);

    col.on('change:name', function(ctx, name) {
      ctx.should.equal(col);
      name.should.equal('Curly');
      name.should.equal(this.getAttribute('name'));
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

    obj.set({name: 'Curly'});
    obj.isValid().should.equal(false);
    obj.validationError.should.equal("Nope");

    obj.set({name: 'Moe'});
    obj.isValid().should.equal(true);
  });
});