// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({

  model: SongModel,

  initialize: function() {
    this.on('add', function(songData) {
      if (this.length === 1) {
        this.playFirst();
      }
    });
    this.on('ended', function() {
      this.remove(this.at(0));
      if (this.length > 0) {
        this.playFirst();
      }
    });
    this.on('dequeue', function(songData) {
      this.remove(songData);
    });
    this.on('enqueue', function(songData) {
      this.add(songData);
    });
  },

  playFirst: function() {
    this.at(0).play();
  },


});