import Ember from 'ember';
import layout from '../templates/components/user-message';

export default Ember.Component.extend({
  layout: layout,

  starRatingImageUrl: function() {
    return ('http://i.keen.com/D1_k3ratingstars-' + this.get('message').starRating + '_V1.png');
  }.property(),

  actions: {
    chatWithAdvisor: function() {
      var self = this;
      this.sendAction('action', {'advisorId': self.get('advisorId')});   //Trigger the controller action by passing the data
    }
  }
  //classNames: []
});
