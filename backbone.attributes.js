// Backbone.Attributes.js 0.7.0
// ---------------

//     (c) 2014 Adam Krebs
//     Backbone.Attributes may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/akre54/Backbone.Attributes

(function (factory) {
  if (typeof define === 'function' && define.amd) { define(['underscore', 'backbone', 'exports'], factory);
  } else if (typeof exports === 'object') { factory(require('underscore'), require('backbone'), exports);
  } else { factory(_, Backbone, {}); }
}(function (_, Backbone, Attributes) {
  _.extend(Backbone.Attributes = Attributes, Backbone.Events);
  var modelMethods = ['get', 'set', 'unset', 'clear', '_validate', 'validate', 'isValid', 'has', 'changed', 'hasChanged', 'changedAttributes', 'previous', 'previousAttributes'];
  var wrappedMethods = ['get', 'set', 'clear', 'changedAttributes'];

  var Model = Backbone.Model.prototype;

  _.each(modelMethods, function(method) {
    var fn = Model[method];
    var wrapper = function() {
      _.defaults(this.attributes || (this.attributes = {}), _.result(this, 'defaults'));
      _.each(wrappedMethods, function(m) { if (this[m].wrapped) this[m] = Model[m]; }, this);
      return fn.apply(this, arguments);
    };
    wrapper.wrapped = true;
    Attributes[method] = _.contains(wrappedMethods, method) ? wrapper : fn;
  });

  Attributes.setAttribute = Attributes.setAttributes = Attributes.set;
  Attributes.getAttribute = Attributes.get;
}));
