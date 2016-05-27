'use strict';

const bunyan = require('bunyan'),
      One = require('./lib/one'),
      Helpers = require('./lib/helpers');

class NPR {

  constructor(config) {

    Object.assign(this, config || {});

    if (! this.log)
      this.log = bunyan.createLogger({name: 'npr'});

    this.one = new One({
      log: this.log.child({ module: 'one' })
    });

  }

  static Helpers() {
    return Helpers;
  }

  static One() {
    return One;
  }

}

exports = module.exports = NPR;
