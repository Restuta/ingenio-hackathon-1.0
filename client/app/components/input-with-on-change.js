import Ember from 'ember';
import layout from '../templates/components/input-with-on-change';

export default Ember.TextField.extend({
  layout: layout,
  type: 'text',

  fewCharacters: 5, //how many characters we call a "few" after typing this many "typedFewCharacters" will be set to true
  typedFewCharacters: false,

  _onInput: function() {

    var value = this.get('value');

    if (!this.typedFewCharacters) {
        if (value && value.length >= this.fewCharacters) {
          this.typedFewCharacters = true;
          this.sendAction('startedTyping', this);
        }
    }

    this.sendAction('onInputChange', this, this.get('value'));
  }.on('input')
});

