import Activity from 'em-test/models/activity';
import Ember from 'ember';

export default {
  loadModels: function(data, store){
    var activities = [];

    data.hits.hits.forEach(function(item, index){
      var i = item._source;
      i['id'] = item._id;
      activities.push(i);
    });

    Activity.reopenClass({
      FIXTURES: activities
    });

  },

  extractMeta: function (data, key) {
    var meta = data.aggregations[key];

    if(meta.buckets){
      return meta.buckets.map(function (item) {
          return Ember.Object.create(item)
      })
    } else {
      return Ember.Object.create(meta);
    }
  },

  incrementPage: function(amt) {
    return Ember.computed('page', 'numPages', function() {
      var newPage = parseInt(this.get('page'), 10) + amt;
      if (newPage <= parseInt(this.get('numPages'), 10) &&
        newPage >= 1) {
        return newPage;
      }
    });
  }
};
