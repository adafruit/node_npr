# Node.js NPR API [![Build Status](https://travis-ci.org/adafruit/node_npr.svg?branch=master)](https://travis-ci.org/adafruit/node_npr)

A Node.js package for accessing NPR APIs.

## Requirements

This module is a [npm](https://www.npmjs.org) package, and requires
the latest stable version of [node.js](https://nodejs.org).

```
$ node -v
v0.12.7
```

## Installation

```
$ mkdir npr_test && cd npr_test
$ npm install npr-api
```

## Usage

As of right now, the full NPR One API is available in this package. There
are more examples in the `test` directory.

**Example:** getting recommendations for your user
```
// paste into a file called index.js,
// and edit the credentials to match
// your account info.
var NPR = require('npr-api');

var npr = NPR({
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  username: 'your_username',
  password: 'your_password'
});

npr.one.init()
  .then(npr.one.listening.getRecommendations({ channel: 'npr' }))
  .then(function(recommendations) {
    console.log(recommendations);
  }).catch(console.err);

```

Then you can run this example by running:

```
$ node index.js
```

## NPR ONE APIs

More information about the NPR One API can be found at the [NPR One Developer Center](http://dev.npr.org/api/).

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
