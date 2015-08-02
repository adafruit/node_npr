var util = require('util');

/************************ PROMISIFY *****************************/
function success(resolve, response) {
  resolve(response.obj);
}

function fail(reject, response) {
  reject(response.data.message);
}

exports.promisify = function(module, operation, parameters) {

  return function() {

    var self = this,
        args = Array.prototype.slice.call(arguments);

    var require_auth = parameters.find(function(param) {
      return param.name === 'Authorization';
    });

    var promise = new Promise(function(resolve, reject) {

      if(require_auth) {

        if(! args[0])
          args[0] = {};

        args[0].Authorization = 'Bearer ' + module.access_token;

      }

      args.push(success.bind(null, resolve));
      args.push(fail.bind(null, reject));

      operation.apply(self, args);

    });

    if(require_auth)
      return module.getAccessToken().then(function() { return promise; });

    return promise;

  };

};

/********************* SWAGGER FIXES ****************************/
function processAPI(module, api) {

  var processed = {};

  Object.keys(api.operations).forEach(function(operation) {
    processed[operation] = exports.promisify(
      module,
      api[operation],
      api.operations[operation].parameters
    );
  });

  return processed;

}

exports.processSwagger = function(module) {

  var apis = {};

  Object.keys(module.client.apis).forEach(function(api) {

    if(api === 'help')
      return;

    apis[api] = processAPI(module, module.client.apis[api]);

  });

  util._extend(module, apis || {});

};

module.exports = exports;
