// Backbone.Attributes.js 0.3.0
// ---------------

//     (c) 2014 Adam Krebs
//     Backbone.Attributes may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/akre54/Backbone.Attributes

(function (factory) {
  if (typeof define === 'function' && define.amd) { define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') { module.exports = factory(require('underscore'), require('backbone'));
  } else { factory(_, Backbone); }
}(function (_, Backbone) {
  Backbone.Attributes = _.extend({}, Backbone.Events);
  var modelMethods = ['get', 'set', 'unset', 'clear', '_validate', 'validate', 'isValid', 'has', 'changed', 'hasChanged', 'changedAttributes', 'previous', 'previousAttributes'];
  var wrappedMethods = ['get', 'set', 'clear', 'changedAttributes'];

  _.each(modelMethods, function(method) {
    var fn = Backbone.Model.prototype[method];
    Backbone.Attributes[method] = _.contains(wrappedMethods, method) ?
       function() { this.attributes || (this.attributes = _.defaults({}, _.result(this, 'defaults'))); return fn.apply(this, arguments) } : fn;
  });

  Backbone.Attributes.getAttribute = Backbone.Attributes.get;
  Backbone.Attributes.setAttribute = Backbone.Attributes.set;

  return Backbone.Attributes;
}));
