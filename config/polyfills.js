/* eslint-disable prefer-destructuring */
// this file came from https://github.com/facebookincubator/create-react-app

const isWeb = require('../src/utils/common').isWeb;

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

if (isWeb) {
  // fetch() polyfill for making API calls.
  require('whatwg-fetch');
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// react polyfills
require('core-js/es6/map');
require('core-js/es6/set');
require('raf/polyfill');

if (process.env.NODE_ENV === 'test') {
  require('./jest/initTest.js');
}
