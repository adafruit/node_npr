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

As of right now, the full [NPR One API](http://dev.npr.org/api/) is available in this package.
It is also set up in a way where it will support the future addition of other [NPR 'Open APIs'](http://www.npr.org/templates/apidoc/)
by adding additional API modules to the `lib/` folder.

**Note:** The only known limitation is that NPR One API module included in this package currently expects
to use the `grant_type` of *password* to get new OAuth access tokens. The other authentication methods will be supported soon.

### Example

First, you will need to create a new file called `index.js` in your favorite text editor.

```
$ vim index.js
```

Then, paste the example below into the file and update the creditials to match your NPR Developer account info.

```
var NPR = require('npr-api');

// edit the credentials to match your account info.
var npr = NPR({
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  username: 'npr_username',
  password: 'npr_password'
});

// promises are [the] shit.
// we speak the way we breathe.
npr.one.init()
  .then(npr.one.listening.getRecommendations({ channel: 'npr' }))
  .then(function(recommendations) {
    // print out the first two recommendations to the console
    console.log(recommendations.items.slice(0,2));
  }).catch(console.err);

```

Then, run the example using `node`.

```
$ node index.js
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
