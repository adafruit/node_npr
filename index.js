/************************ DEPENDENCIES *****************************/
var shim = require('es6-shim'),
    util = require('util'),
    bunyan = require('bunyan'),
    One = require('./lib/one'),
    Helpers = require('./lib/helpers');

var proto = NPR.prototype;
exports = module.exports = NPR;

/************************* CONSTRUCTOR ****************************/
function NPR(config) {

  if (! (this instanceof NPR))
    return new NPR(config);

  util._extend(this, config || {});

  if (! this.client_id)
    throw('OAuth Client ID not supplied');

  if (! this.client_secret)
    throw('OAuth Client Secret not supplied');

  if (! this.username)
    throw('NPR username not supplied');

  if (! this.password)
    throw('NPR password not supplied');

  if (! this.log)
    this.log = bunyan.createLogger({name: 'npr'});

  this.one = One({
    log: this.log.child({ module: 'one' }),
    credentials: {
      client_id: this.client_id,
      client_secret: this.client_secret,
      username: this.username,
      password: this.password
    }
  });

}

/**************************** STATIC ******************************/
NPR.Helpers = Helpers;
NPR.One = One;

/*************************** DEFAULTS *****************************/
proto.client_id = false;
proto.client_secret = false;
proto.username = false;
proto.password = false;
proto.one = false;
proto.log = false;
