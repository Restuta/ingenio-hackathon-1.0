/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hackathon',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "*",
    'script-src': "*", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "*", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "*", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "*",
    'style-src': "*", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "*'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    //ENV.locationType = 'hash'; //to support urls with '#' since history API requires server-side setup
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
