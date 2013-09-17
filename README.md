Backbone.Attributes
===================

Backbone.Attributes is a tiny (less than 15 lines) plugin to give any object
Backbone.Model getter/setter methods. Sometimes models are too heavyweight or
you don't need the full sync / collection methods Backbone Models provide.

```javascript
var view = new Backbone.View;
_.extend(view, Backbone.Attributes);
view.on('change:page_title', function(title) {
  this.$('.title').text(title);
});

view.set('title', 'Results');
```