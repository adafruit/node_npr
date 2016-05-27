const NPR = require('../index'),
      npr = new NPR();

// paste in your token here or use env var
const token = process.env.ACCESS_TOKEN || 'access_token_from_step_1';

npr.one.init(token)
  .then(function() {
    return npr.one.listening.getRecommendations({ channel: 'npr' });
  })
  .then(function(recommendations) {
    // print out the first two recommendations to the console
    console.log(recommendations.items.slice(0,2));
  }).catch(console.err);
