// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({
  tagName: 'table', 

  initialize: function() {
    this.render();
    // console.log(params);
    
    this.collection.on('add', function(model) {
      this.render();
    }, this);

    this.collection.on('remove', function(model) {
      this.render();
    }, this);

  },
  // listens for events from DOM
  events: {
    'add': function() {
      this.render();
    },
    'remove': function() {
      this.render();
    }
  },


  render: function() {
    this.$el.children().detach();
    this.$el.html('<th>Song Queue</th>').append(this.collection.map(function(song) {
      return new SongQueueEntryView({
        model: song
      }).render();
    }));

  }

});
