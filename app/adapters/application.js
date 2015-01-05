/**
 *
 * Since we are not hitting the server use fixtures (test data)
 *
 */

import DS from 'ember-data';

export default DS.FixtureAdapter.extend({
  latency: 1000,

  ajax: function() {
    return Ember.RSVP.Promise.cast()
  }

});
