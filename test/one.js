var NPR = require('../index'),
    npr;

process.env.NODE_ENV = 'test';

describe('NPR One', function() {

  describe('Init', function() {

    this.timeout(15000);

    it('should create a client', function(done) {

      npr = new NPR();

      npr.one.init()
        .then(function() { done(); })
        .catch(done);

    });

  });

  describe('Authorization', function() {

    it('should set access token without error', function(done) {
      npr.one.setAccessToken(process.env.NPR_ACCESS_TOKEN).then(function() { return done(); }).catch(done);
    });

  });

  describe('Listening', function() {

    this.timeout(15000);

    it('should get channels', function(done) {

      npr.one.listening.getChannels().then(function(res) {

         if(! res.items.length)
           return done('missing channels');

         done();

       }).catch(done);

    });

    it('should get history', function(done) {

      npr.one.listening.getHistory().then(function(res) {

         if(! res.items.length)
           return done('missing history');

         done();

       }).catch(done);

    });

    it('should get recommendations', function(done) {

      npr.one.listening
       .getRecommendations({channel: 'npr'})
       .then(function(res) {

         if(! res.items.length)
           return done('missing recommendations');

         done();

       }).catch(done);

    });

    it('should get search recommendations', function(done) {

      npr.one.listening
       .getSearchRecommendations({searchTerms: 'dog'})
       .then(function(res) {

         if(! res.items.length)
           return done('missing search recommendations');

         done();

       }).catch(done);

    });

  });

});
