// config-overrides.js

const path = require('path');

module.exports = function override(config) {
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify")
  };
  return config;
};
