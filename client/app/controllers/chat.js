import Ember from 'ember';

export default Ember.Controller.extend({
  starRatingImageUrl: function() {
    return ('http://i.keen.com/D1_k3ratingstars-' + this.get('model.starRating') + '_V1.png');
  }.property()
});
