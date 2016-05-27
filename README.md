# Node.js NPR API [![Build Status](https://travis-ci.org/adafruit/node_npr.svg?branch=master)](https://travis-ci.org/adafruit/node_npr)

A Node.js package for accessing NPR APIs.

## Requirements

This module is a [npm](https://www.npmjs.org) package, and requires
the latest stable version of [node.js](https://nodejs.org).

```
$ node -v
v6.2.0
```

## Installation

```
$ mkdir npr_test && cd npr_test
$ npm install npr-api
```

## Usage

As of right now, the full [NPR One API](http://dev.npr.org/api/) is available in this package.
It is also set up in a way where it will support the future addition of other [NPR 'Open APIs'](http://www.npr.org/templates/apidoc/)
by adding additional API modules to the `lib/` folder.


### Example

First, you will need to create a new file called `get_token.js` in your favorite text editor.

```sh
$ vim get_token.js
```

Then, paste the example below into the file and update the creditials to match your NPR Developer account info.

```js
const NPR = require('npr-api'),
      npr = new NPR();

const client_id = 'your_oauth_client_id',
      client_secret = 'your_oauth_client_secret';

npr.one.init()
   .then(function() {

     return npr.one.authorization
      .generateDeviceCode({
         client_id: client_id,
         client_secret: client_secret,
         scope: 'listening.write identity.readonly'
       });

   })
  .then(function(res) {

    return new Promise(function(resolve, reject) {

      console.log('Please visit the following URL:');
      console.log(`${res.verification_uri}\n`);
      console.log(`Enter code: ${res.user_code}\n`);
      console.log('Press the Spacebar when complete.');

      process.stdin.setRawMode(true);
      process.stdin.resume();

      process.stdin.on('data', function() {
        resolve(res.device_code);
      });

    });

  })
  .then(function(code) {
    return npr.one.authorization
      .createToken({
         grant_type: 'device_code',
         client_id: client_id,
         client_secret: client_secret,
         code: code
       });
  })
  .then(function(res) {
    console.log(`ACCESS TOKEN: ${res.access_token}`);
    process.exit();
  })
  .catch(function(err) {
    console.log(err.statusText);
    process.exit(1);
  });
```

Then, run the example using `node`.

```sh
$ node get_token.js
```

You will only need this once to get an access token to use from
now on. Next, you will need to create a new file called `get_recommendations.js` in your favorite text editor.

```sh
$ vim get_recommendations.js
```

Then, paste the example below into the file and update the creditials to match your NPR Developer account info.

```js
const NPR = require('npr-api'),
      npr = new NPR();

// paste in your token here
const token = 'access_token_from_step_1';

npr.one.init(token)
  .then(function() {
    return npr.one.listening.getRecommendations({ channel: 'npr' });
  })
  .then(function(recommendations) {
    // print out the first two recommendations to the console
    console.log(recommendations.items.slice(0,2));
  }).catch(console.err);
```

Then, run the example using `node`.

```
$ node get_recommendations.js
```

You should then see a couple of the listening recommendations for your NPR account dumped to your terminal's `stdout`.

## NPR ONE APIs

More information about the NPR One API can be found at the [NPR One Developer Center](http://dev.npr.org/).

* Authorization
  * `npr.one.authorization.createToken()`
  * `npr.one.authorization.generateDeviceCode()`
  * `npr.one.authorization.getAuthorizationPage()`
* Identity
  * `npr.one.identity.getUser()`
  * `npr.one.identity.postFollowing()`
  * `npr.one.identity.updateFollowingStatus()`
  * `npr.one.identity.updateStations()`
* Listening
  * `npr.one.listening.getAggRecommendations()`
  * `npr.one.listening.getChannels()`
  * `npr.one.listening.getHistory()`
  * `npr.one.listening.getRecommendations()`
  * `npr.one.listening.getSearchRecommendations()`
  * `npr.one.listening.postRating()`
* Local Activation
  * `npr.one.localactivation.sendDonationEmail()`
* Sponsorship
  * `npr.one.sponsorship.getAds()`
  * `npr.one.sponsorship.receiveAdTracking()`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing
coding style. Add unit tests for any new or changed functionality.
Lint and test your code using [Gulp](http://gulpjs.com/).

## License

Copyright (c) 2015 Adafruit Industries. Licensed under the MIT license.
