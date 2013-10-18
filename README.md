Backbone.Attributes
===================

Backbone.Attributes is a tiny (less than 15 lines) plugin to give any object
Backbone.Model getter/setter methods. Sometimes models are too heavyweight or
you don't need the full sync / collection methods Backbone Models provide.

```javascript
var view = new Backbone.View;
_.defaults(view, Backbone.Attributes);

view.on('change:title', function(title) {
  this.$('.title').text(title);
});

view.set('title', 'Results');
```

These methods are borrowed from Backbone.Model, so their functionality is
exactly the same. You can pass a hash of properties, listen on multiple
change events, or trigger complex change sequences.

Note: `get` and `set` collide with native `Collection#get` and `Collection#set`. If your
target is a Collection, you must use the `getAttribute`/`setAttribute` aliases
instead.
