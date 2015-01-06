import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Copyable, {
  searchField: DS.attr('string'),
  status: DS.attr('string'),
  state: DS.attr('string'),
  contactType: DS.attr('raw'),
  organizer: DS.attr('raw'),
  organization: DS.attr('raw'),
  topics: DS.attr('raw')


});
