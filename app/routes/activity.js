import Ember from 'ember';

export default Ember.Route.extend({
  madel: function (params) {
    return this.store.find('activity', params.activity_id);
  }
});
