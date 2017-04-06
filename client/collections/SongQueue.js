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
        console.log(this.at(0));
        this.playFirst();
      }
    });
    this.on('dequeue', function() {
      this.remove(this.at(0));
    });
    this.on('enqueue', function() {   /// <--- double check if code works later
      this.add();
    });
  },

  playFirst: function() {
    this.at(0).play();
  },


});