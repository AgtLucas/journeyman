'use strict';

var _ = require('highland');
var request = _.wrapCallback(require('request'));

// Test the name endpoint once per day
_(function(push, next) {
  push(null, 'http://private-9013f4-nodeguy.apiary-mock.com/name');
  setTimeout(next, 24 * 60 * 60 * 1000);
})
  .flatMap(request)
  .pluck('body')
  .map(JSON.parse)
  .filter(function(data) {
    return data === 'David Braun';
  })
  .map('https://nosnch.in/0b09461076')
  .flatMap(request)
  .pluck('body')
  .pipe(process.stdout);