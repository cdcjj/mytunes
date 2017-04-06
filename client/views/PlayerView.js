// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  initialize: function() {
  },

  events: {
    'ended': function() { /// <--- DOESN"T WORK FIX!!!.
      this.trigger('ended', this);
    }
    // listen for audio to be "ended";
  },

  setSong: function(song) {
    this.model = song;
    this.render();
    // called in AppView to set new song.
  },

  render: function() {
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});


// <audio controls autoplay src="mp3s/08 4 Page Letter.mp3"/>