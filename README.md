Backbone.Attributes
===================

Backbone.Attributes is a tiny (~400 bytes minified/gz) plugin to give any object
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

Note: `get` and `set` collide with native `Collection#get` and `Collection#set`.
If your target is a Collection, you must use the `getAttribute`/`setAttribute`
aliases instead.

The target object's `attributes` property is set on the first call to a method
that relies on its existence (`clear`, `get` or `set`). This is
mostly to ensure that attributes aren't shared between instances. If you need
`attributes` earlier, you may create it yourself (e.g. during `initalize`)
and Backbone.Attributes will respect the existing values.

Example
-------
Let's say we're building a music player application that has a list of tracks
organized into a Playlist collection. When the user clicks on the "next" button,
we want to update the index of the currently playing track and alert any views
listening on the Playlist. It might look something like this:

```javascript
var Playlist = Backbone.Collection.extend({
  defaults: {
    currentTrack: 0,
    title: "My Playlist"
  },
  initialize: function() {
    this.on('change:currentTrack', function() {
      var oldTrack = this.at(this.previous('currentTrack')),
          newTrack = this.at(this.getAttribute('currentTrack'));

      this.stopListening(oldTrack, 'track:done');
      this.listenTo(newTrack, 'track:done', this.nextTrack);
    });
  },
  setTrack: function(trackPosition) {
    this.setAttribute('currentTrack', trackPosition);
  },
  nextTrack: function() {
    this.setTrack(this.getAttribute('currentTrack') + 1);
  }
});

_.defaults(Playlist.prototype, Backbone.Attributes);

var PlayerView = Backbone.View.extend({
  events: {
    'click .track': 'setTrack'
  },
  initialize: function() {
    this.listenTo(this.collection, 'change:currentTrack', this.updateTrackDetails);
  },
  setTrack: function(e) {
    this.collection.setTrack($(e.target).index());
  },
  updateTrackDetails: function() {
    // Set album art, etc.
  }
});

new PlayerView({collection: new Playlist});
```

