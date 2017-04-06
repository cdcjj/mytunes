// Songs.js - Defines a backbone collection class for songs.
window.recordResponse;
var Songs = Backbone.Collection.extend({
  url: 'http://parse.atx.hackreactor.com/mytunes/classes/songs',

  model: SongModel,
  
  initialize: function() {
    this.fetch({
      reset: true,
      success: function(response, xhr) {
        console.info('Inside success');
      },
      error: function (errorResponse) {
        console.log(errorResponse);
      }
    });
  },
  events: {
    'add': function () {
      this.model.trigger('add', this);
    },
  },
  parse: function(response) {
    return response.results;
  }

});
