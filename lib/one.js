/************************ DEPENDENCIES *****************************/
var util = require('util'),
    bunyan = require('bunyan'),
    helpers = require('./helpers'),
    swagger = require('swagger-client');

var proto = One.prototype;
exports = module.exports = One;

/************************* CONSTRUCTOR ****************************/
function One(config) {

  if (! (this instanceof One))
    return new One(config);

  util._extend(this, config || {});

  if(! this.log)
    this.log = bunyan.createLogger({name: 'npr-one'});

  // silence swagger log output
  process.env.NODE_ENV = 'test';

}

/*************************** DEFAULTS *****************************/
proto.token = false;
proto.swagger_url = 'https://api.npr.org/documentation/beryllium/api-docs';
proto.log = false;

proto.init = function(token) {

  var self = this;

  if(token)
    this.setAccessToken(token);

  return new Promise(function(resolve, reject) {

    var client = new swagger({
      url: self.swagger_url,
      success: function() {
        self.client = client;
        helpers.processSwagger(self);
        resolve(self);
      },
      failure: function() {
        reject('swagger init failed');
      }
    });

  });

};

proto.setAccessToken = function(token) {

  var self = this;

  this.token = token;

  return new Promise(function(resolve, reject) {

     if(! self.token)
       return reject('no token supplied');

     var auth = new swagger.ApiKeyAuthorization('Authorization', 'Bearer ' + token, 'header');

     self.client.clientAuthorizations.add('oauth2', auth);

     resolve();

  });

};

proto.getAccessToken = function() {

  var self = this;

  return new Promise(function(resolve, reject) {

     if(! self.token)
       return reject('no token supplied');

     resolve(self.token);

  });

};
