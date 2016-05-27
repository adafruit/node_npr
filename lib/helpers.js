'use strict';

const success = (resolve, response) => {
  resolve(response.obj);
};

const fail = (reject, response) => {
  reject(response);
};

const processAPI = (module, api) => {

  const processed = {};

  Object.keys(api.operations).forEach((operation) => {
    processed[operation] = exports.promisify(
      module,
      api[operation],
      api.operations[operation].parameters
    );
  });

  return processed;

};

const applyAuth = (operation, args, access_token) => {

  return new Promise((resolve, reject) => {

    if(access_token) {

      if(! args[0])
        args[0] = {};

      args[0].Authorization = 'Bearer ' + access_token;

    }

    args.push(success.bind(null, resolve));
    args.push(fail.bind(null, reject));

    operation.apply(this, args);

  });

};

exports.promisify = (module, operation, parameters) => {

  return (...args) => {

    const require_auth = parameters.find((param) => {
      return param.name === 'Authorization';
    });

    if(require_auth)
      return module.getAccessToken().then(applyAuth.bind(this, operation, args));

    return applyAuth.call(this, operation, args);

  };

};

exports.processSwagger = (module) => {

  const apis = {};

  Object.keys(module.client.apis).forEach((api) => {

    if(api === 'help')
      return;

    apis[api] = processAPI(module, module.client.apis[api]);

  });

  Object.assign(module, apis || {});

};
