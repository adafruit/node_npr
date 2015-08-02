# Node.js NPR API [![Build Status](https://travis-ci.org/adafruit/node_npr.svg?branch=master)](https://travis-ci.org/adafruit/node_npr)

A Node.js wrapper for NPR APIs.

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
