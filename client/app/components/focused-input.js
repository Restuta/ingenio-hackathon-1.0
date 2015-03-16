import Ember from 'ember';
import layout from '../templates/components/focused-input';

export default Ember.TextField.extend({
  layout: layout,

  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});
