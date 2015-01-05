/**
 * This controller supports list of activities and filtering them
 * Pagination implementation taken from http://jsbin.com/fayug/edit?html,js,output
 */

import Ember from 'ember';
import config from 'em-test/config/environment';
import tools from 'em-test/utils/json-process';

export default Ember.ArrayController.extend({
  queryParams: [ 'page', 'pageSize', 'descriptive', 'types'],
  dateRange: null,
  page: 1,
  // TODO Page size should be calculated when opening the page,
  // on resize (not for phoneGap) and on rotation of a device.

  pageSize: 10,
  descriptive: '',
  types:[],

  // date range filter does not work
  dateRangeFilters: config.dateRangeFilters,

  // TODO filter state from QP
  onActivityTypeChange: function () {
    var selectedTypes = [],
        filters = this.get('activityTypeFilters'),
        types = this.get('types');

    if (filters && !Ember.isEmpty(filters)) {
      filters.forEach(function (item) {
        if (item.get('isChecked')) {
          selectedTypes.push(item.key);
        }
      });
    }

    this.set('types', selectedTypes);
  }.observes('activityTypeFilters.@each.isChecked').on('init')

  /*onQPChange: function(){
    Ember.run.once(this, this.filterContent);
  }.observes('content', 'offset').on('init'),

  filterContent: function(){
    var content = this.get('content'),
        offset = this.get('offset'),
        itemsPerPage = this.get('itemsPerPage');

    this.set('activities', content.slice(offset, itemsPerPage));
  }*/

 /* onDescriptiveChange: function(){
    var descriptive = this.get('descriptive'), ctrl = this, filtered;
    Ember.run.debounce(this, function () {
      filtered = ctrl.get('content').filter(function (item, index) {
        return item.get('searchField').search(descriptive) != -1
      });
      ctrl.set('activities', filtered);
    }, 3000, true);

  }.observes('descriptive')*/


});
