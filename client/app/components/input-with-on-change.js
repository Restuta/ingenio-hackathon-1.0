import Ember from 'ember';
import layout from '../templates/components/input-with-on-change';

export default Ember.TextField.extend({
  layout: layout,
  type: 'text',

  _onInput: function() {
    this.sendAction('onInputChange', this, this.get('value'));
  }.on('input')
});

