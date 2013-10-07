// Backbone.Attributes.js 0.2.1
// ---------------

//     (c) 2013 Adam Krebs
//     Backbone.Attributes may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/akre54/Backbone.Attributes

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
      factory(require('underscore'), require('backbone'));
  } else {
      factory(_, Backbone);
  }
}(function (_, Backbone) {
  Backbone.Attributes = _.extend({}, Backbone.Events);
  var modelMethods = ['get', 'set', 'unset', 'clear', 'has', 'changed', 'hasChanged', 'changedAttributes', 'previous', 'previousAttributes'];
  var wrappedMethods = ['getAttribute', 'setAttribute', 'clear', 'changedAttributes'];

  _.each(modelMethods, function(method) {
    var fn = Backbone.Model.prototype[method];
    method = method === 'get' || method === 'set' ? method + 'Attribute' : method;
    Backbone.Attributes[method] = _.contains(wrappedMethods, method) ?
       function() { this.attributes || (this.attributes = _.defaults({}, _.result(this, 'defaults'))); return fn.apply(this, arguments) } : fn;
  });

  Backbone.Attributes._validate = function() { return true; }; // hacky, but works

  return Backbone.Attributes;
}));
