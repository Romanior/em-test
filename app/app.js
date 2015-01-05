import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from 'em-test/config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

Ember.TextSupport.reopen({
  attributeBindings: ["results", "autocorrect", "autocomplete"]
});

loadInitializers(App, config.modulePrefix);

export default App;
