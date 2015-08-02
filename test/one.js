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

    it('should get an access token', function(done) {

      npr.one.authorization
       .createToken(npr.one.credentials)
       .then(function(res) {

         if(! res.access_token)
           done('missing token');

         done();

       }).catch(done);

    });

  });

});
