describe('Songs', function() {
  describe('when fetching song data from Parse', function() {
    var songs, fakeSongData, fakeResponse, xhr, requests;

    beforeEach(function() {
      requests = [];
      xhr = sinon.useFakeXMLHttpRequest();
      xhr.onCreate = function(request) {
        requests.push(request);
      };

      fakeSongData = [
        {
          artist: 'Fakey McFakerson',
          title: 'Never Gonna Mock You Up',
          url: 'example/url'
        },
        {
          artist: 'BittyBacon',
          title: 'Sizzle Sundays',
          url: 'fake/url'
        }
      ];

      fakeResponse = JSON.stringify({ results: fakeSongData });
    });

    afterEach(function() {
      xhr.restore();
    });

    it('should GET song data from Parse when initialized', function() {
      songs = new Songs();
      expect(requests[0].method).to.equal('GET');
      expect(requests[0].url).to.include('http://parse.atx.hackreactor.com/mytunes/classes/songs');
    });

    it('should populate itself with the data returned from the Parse server', function() {
      songs = new Songs();
      requests[0].respond(200, { 'Content-Type': 'application/json' }, fakeResponse);
      expect(songs).to.have.length(2);
      expect(songs.at(0).get('title')).to.equal('Never Gonna Mock You Up');
      expect(songs.at(1).get('artist')).to.equal('BittyBacon');
    });

  });
  describe('ensuring fetched data is correct', function() { 
    
    beforeEach(function(done) {
      ownSongs = new Songs();

      // Mocha only runs subsequent lines of code when "done" has been called.
      // this is not a efficient way to wait for server to respond but good for this sprint.
      setTimeout(function() {
        done();
      }, 1000);
    });

    it('has to retrieve data from server as an array of objects', function() {      
      expect(ownSongs.models).to.be.an('array');
      ownSongs.models.forEach(function(aSong) {
        expect(aSong).to.be.an('object');
      });
    });

    it('has to retrieve songs ONLY by Aaliyah', function() {
      ownSongs.models.forEach(function(aSong) {
        var fetchedArtist = aSong.get('artist');
        expect(fetchedArtist).to.equal('Aaliyah');
      });
    });
  });
});
