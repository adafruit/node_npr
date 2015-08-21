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

  if (! this.log)
    this.log = bunyan.createLogger({name: 'npr'});

  this.one = One({
    log: this.log.child({ module: 'one' })
  });

}

/**************************** STATIC ******************************/
NPR.Helpers = Helpers;
NPR.One = One;

/*************************** DEFAULTS *****************************/
proto.one = false;
proto.log = false;
