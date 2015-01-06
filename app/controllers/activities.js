/**
 * This controller supports list of activities and filtering them
 * Pagination implementation taken from http://jsbin.com/fayug/edit?html,js,output
 */

import Ember from 'ember';
import config from 'em-test/config/environment';
import tools from 'em-test/utils/tools';

export default Ember.ArrayController.extend({
  queryParams: [ 'page', 'pageSize', 'descriptive', 'types'],
  dateRange: null,
  page: 1,

  // TODO Page size should be calculated when opening the page,
  // on resize (not for phoneGap) and on rotation of a device.
  pageSize: 9,
  descriptive: '',
  types:[],

  showClose: false,

  // date range filter does not work
  dateRangeFilters: config.dateRangeFilters,

  // save initial model for filtering
  initModel: function () {
    return this.get('content').slice(0);
  }.property(),

  // TODO filter state from QP
  // TODO actually filter the content
  onActivityTypeChange: function () {
    var selectedTypes = [],
        filters = this.get('activityTypeFilters');

    if (filters && !Ember.isEmpty(filters)) {
      filters.forEach(function (item) {
        if (item.get('isChecked')) {
          selectedTypes.push(item.key);
        }
      });
    }

    this.set('types', selectedTypes);
  }.observes('activityTypeFilters.@each.isChecked'),

  onDescriptiveChange: function(){
    var ctrl = this,
      descriptive = ctrl.get('descriptive'),
      filtered,
      initModel = ctrl.get('initModel');

    Ember.run.debounce(this, function () {
      if(descriptive) {
        filtered = initModel.filter(function (item) {
          return item.get('searchField').search(descriptive) !== -1;
        });
        ctrl.set('content', filtered);
      } else{
        ctrl.set('content', initModel);
      }
      this.set('page', 1);
    }, 3000, true);

  }.observes('descriptive'),

  numPages: function() {
    var pageSize = this.get('pageSize'),
      l = this.get('content.length');
    return Math.ceil(l / pageSize);
  }.property('pageSize', 'content.length'),

  paged: function() {
    var page = this.get('page') - 1,
      pageSize = this.get('pageSize'),
      start = page * pageSize,
      end = start + pageSize;
    return this.get('content').slice(start, end);
  }.property('page', 'content', 'pageSize'),

  previousPage: tools.incrementPage(-1),
  nextPage:     tools.incrementPage(1)
});

