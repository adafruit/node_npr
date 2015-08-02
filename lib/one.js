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

  if(! this.credentials)
    throw('Missing API credentials');

  if(! this.log)
    this.log = bunyan.createLogger({name: 'npr-one'});

  this.credentials.grant_type = 'password';
  this.getAccessToken = this.getAccessToken.bind(this);
}

/*************************** DEFAULTS *****************************/
proto.credentials = false;
proto.client = false;
proto.swagger_url = 'https://api.npr.org/documentation/beryllium/api-docs';
proto.log = false;

proto.init = function() {

  var self = this;

  return new Promise(function(resolve, reject) {

    self.client = new swagger({
      url: self.swagger_url,
      success: function() {
        helpers.processSwagger(self);
        resolve(self);
      },
      failure: function() {
        reject('swagger init failed');
      }
    });

  });

};

proto.getAccessToken = function() {

  var self = this;

  if(! this.access_token)
    return this.authorization.createToken(this.credentials);

  return new Promise(function(resolve, reject) {
    resolve(self.access_token);
  });

};
