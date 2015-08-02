var NPR = require('../index'),
    npr;

process.env.NODE_ENV = 'test';

describe('NPR One', function() {

  this.timeout(10000);

  describe('Init', function() {

    it('should create a client', function(done) {

      npr = NPR({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: process.env.NPR_USERNAME,
        password: process.env.NPR_PASSWORD
      });

      npr.one.init()
        .then(function() { done(); })
        .catch(done);

    });

  });

  describe('Authorization', function() {

    it('should get an access token using password grant type', function(done) {

      npr.one.authorization
       .createToken(npr.one.credentials)
       .then(function(res) {

         if(! res.access_token)
           done('missing access token');

         done();

       }).catch(done);

    });

  });

  describe('Listening', function() {

    it('should get channels', function(done) {

      npr.one.listening
       .getChannels()
       .then(function(res) {

         if(! res.items.length)
           done('missing channels');

         done();

       }).catch(done);

    });

    it('should get history', function(done) {

      npr.one.listening
       .getHistory()
       .then(function(res) {

         if(! res.items.length)
           done('missing history');

         done();

       }).catch(done);

    });

    it('should get recommendations', function(done) {

      npr.one.listening
       .getRecommendations({channel: 'npr'})
       .then(function(res) {

         if(! res.items.length)
           done('missing recommendations');

         done();

       }).catch(done);

    });

    it('should get search recommendations', function(done) {

      npr.one.listening
       .getSearchRecommendations({searchTerms: 'dog'})
       .then(function(res) {

         if(! res.items.length)
           done('missing search recommendations');

         done();

       }).catch(done);

    });

  });

});
