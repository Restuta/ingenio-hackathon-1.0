import Ember from 'ember';
import Notify from '../utils/notify';

export default Ember.Controller.extend({
  sessioinIsOverNotification: Notify.property(),
  ccAdded: false,

  actions: {
    addMinutes: function() {
      this.set('ccAdded', true);
    },
    send: function() {
      this.get('sessioinIsOverNotification').success({closeAfter: null});
    }
  },

  starRatingImageUrl: function() {
    return ('http://i.keen.com/D1_k3ratingstars-' + this.get('model.starRating') + '_V1.png');
  }.property()
});
