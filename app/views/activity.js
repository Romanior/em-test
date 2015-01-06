import Ember from 'ember';
var html = Ember.$('html');

export default Ember.View.extend({
  didInsertElement: function () {
    html.addClass('cnt-activate');
  },
  willDestroyElement: function () {
    html.removeClass('cnt-activate');
  }
});
