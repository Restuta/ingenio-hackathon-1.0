import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var EmberSockets = window.EmberSockets;

var Socket = EmberSockets.extend({
  host: Ember.ENV.socketServer,
  port: Ember.ENV.port || 31337,
  controllers: ['ask-keen', 'dashboard'],
  autoConnect: true
});


var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,

  Socket: Socket
});


loadInitializers(App, config.modulePrefix);

export default App;
