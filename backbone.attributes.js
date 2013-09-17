(function() {
  Backbone.Attributes = _.extend({}, Backbone.Events);
  var modelMethods = ['get', 'set', 'unset', 'clear', 'has', 'changed', 'hasChanged', 'changedAttributes', 'previous', 'previousAttributes'];
  var wrappedMethods = ['get', 'set', 'clear', 'changedAttributes'];

  _.each(modelMethods, function(method) {
    var fn = Backbone.Model.prototype[method];
    Backbone.Attributes[method] = _.contains(wrappedMethods, method) ?
       function() { this.attributes || (this.attributes = {}); return fn.apply(this, arguments) } : fn;
  });

  Backbone.Attributes._validate = function() { return true; }; // hacky, but works
}).call(this);