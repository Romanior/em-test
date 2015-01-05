import Ember from 'ember';
import config from 'em-test/config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('activities', function(){
    this.resource('activity', {path: ':activity_id'});
  });
});

export default Router;
