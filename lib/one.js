'use strict';

const bunyan = require('bunyan'),
      helpers = require('./helpers'),
      Swagger = require('swagger-client');

class One {

  constructor(config) {

    this.token = false;
    this.swagger_url = 'https://api.npr.org/documentation/beryllium/api-docs';
    this.log = false;

    Object.assign(this, config || {});

    if(! this.log)
      this.log = bunyan.createLogger({name: 'npr-one'});

    // silence swagger log output
    process.env.NODE_ENV = 'test';

  }

  init(token) {

    if(token)
      this.setAccessToken(token);

    return new Promise((resolve, reject) => {

      const client = new Swagger({
        url: this.swagger_url,
        success: () => {
          this.client = client;
          helpers.processSwagger(this);
          resolve(this);
        },
        failure: () => {
          reject('swagger init failed');
        }
      });

    });

  }

  setAccessToken(token) {

    this.token = token;

    return new Promise((resolve, reject) => {

       if(! this.token)
         return reject('no token supplied');

       const auth = new Swagger.ApiKeyAuthorization('Authorization', `Bearer ${token}`, 'header');

       this.client.clientAuthorizations.add('oauth2', auth);

       resolve();

    });

  }

  getAccessToken() {

    return new Promise((resolve, reject) => {

       if(! this.token)
         return reject('no token supplied');

       resolve(this.token);

    });

  }

}

exports = module.exports = One;
