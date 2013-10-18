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
    obj = _.defaults(obj, Backbone.Attributes);

    obj.get('name').should.equal('Moe');
    obj.on('change:name', function(ctx, name) {
      name.should.equal('Curly');
      this.get('name').should.equal(name);
    });
    obj.set('name', 'Curly');
  });

  it('should not collide with Backbone.Collection methods', function() {
    var col = _.defaults(new Backbone.Collection, Backbone.Attributes);

    col.get.should.equal(Backbone.Collection.prototype.get);

    col.getAttribute = Backbone.Attributes.get;
    col.setAttribute = Backbone.Attributes.set;

    col.on('change:name', function(ctx, name) {
      ctx.should.equal(col);
      this.should.equal(col);
      name.should.equal('Curly');
      this.getAttribute('name').should.equal(name);
    });
    col.setAttribute('name', 'Curly');
  });

  it('should expose both get/getAttribute and set/setAttribute', function() {
    var obj = _.defaults({}, Backbone.Attributes);
    obj.set('name', 'Curly');
    obj.get('name').should.equal('Curly');
    obj.getAttribute('name').should.equal('Curly');
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