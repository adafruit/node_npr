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

proto.getAccessToken = function() {

  var self = this;

  return new Promise(function(resolve, reject) {

    if(self.access_token)
      return resolve(self.access_token);

    self.authorization
      .createToken(self.credentials)
      .then(function(res) {
        self.access_token = res.access_token;
        resolve(self.access_token);
      })
      .catch(reject);

  });

};
