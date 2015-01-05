/*
 *  List of elements to filter with
 */

import Ember from 'ember';

export default Ember.Component.extend({
  isSingleSelect: true,
  items: [],
  tagName: 'ul',
  classNames: 'filter-list'

});
