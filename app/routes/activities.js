import Ember from 'ember';
import request from 'ic-ajax';
import tools from 'em-test/utils/tools';

export default Ember.Route.extend({

  /**
  * because of completely custom, etc.. JSON I need to heavily post-process and
  * make it REST and Ember-data friendly
   */
  beforeModel: function(){
    var route = this, store = this.store;

    return request({
      url: '/data.json_.txt'
    }).then(function(data){
      data = JSON.parse(data);
      route.set('meta', tools.extractMeta(data, 'activity_contact_types'));
      return tools.loadModels(data, store);
    });

  },

  model: function(){
    return this.store.find('activity');
  },

  setupController: function (ctrl, model){
    ctrl.set('content', model);

    /**
     * Properly extract filters information
     * TODO all other filters should be done similar way
     * and updated when server updates search results
     */
    ctrl.set('activityTypeFilters', this.get('meta'));
  }

});
