var _ = require('underscore'),
    Backbone = require('backbone'),
    should = require("chai").should(),
    Attributes = require('../backbone.attributes');

describe('Backbone.Attributes', function() {
  it('works with plain objects', function() {
    var obj = _.defaults({}, Attributes);

    obj.on('change:name', function(ctx, name) {
      ctx.should.equal(obj);
      this.should.equal(obj);
      name.should.equal('Curly');
    });
    obj.set('name', 'Curly');
  });

  it('creates attributes per object', function() {
    var a = _.defaults({}, Attributes),
        b = _.defaults({}, Attributes);

    a.set('name', 'Curly');
    should.not.exist(b.get('name'));
    a.attributes.should.not.equal(b.attributes);
  });

  it('works with defaults', function() {
    var obj = {
      defaults: {
        name: 'Moe'
      }
    };
    _.defaults(obj, Attributes);

    obj.get('name').should.equal('Moe');
    obj.on('change:name', function(ctx, name) {
      name.should.equal('Curly');
      name.should.equal(this.get('name'));
    });
    obj.set('name', 'Curly');

    obj.defaults.title = 'Larry';
    should.not.exist(obj.get('title'));
  });

  it('does not collide with Backbone.Collection methods', function() {
    var col = _.defaults(new Backbone.Collection, Attributes);

    col.get.should.equal(Backbone.Collection.prototype.get);
    col.set.should.equal(Backbone.Collection.prototype.set);

    col.on('change:name', function(ctx, name) {
      ctx.should.equal(col);
      name.should.equal('Curly');
      name.should.equal(this.getAttribute('name'));
    });
    col.setAttribute('name', 'Curly');
    col.setAttributes('name', 'Curly');
    col.getAttribute('name').should.equal('Curly');
  });

  it('updates object methods to originals after wrapper called', function() {
    var obj = _.defaults({}, Attributes);
    obj.get.should.not.equal(Backbone.Model.prototype.get);
    obj.get.should.equal(Attributes.get);
    obj.get('foo');
    obj.get.should.equal(Backbone.Model.prototype.get);
  });

  it('accepts a validate method', function() {
    var obj = {
      validate: function(attrs) {
        if (attrs.name === 'Curly') return "Nope";
      }
    };

    _.defaults(obj, Attributes);

    obj.set({name: 'Curly'});
    obj.isValid().should.equal(false);
    obj.validationError.should.equal("Nope");

    obj.set({name: 'Moe'});
    obj.isValid().should.equal(true);
  });
});

