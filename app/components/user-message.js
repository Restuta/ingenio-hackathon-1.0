import Ember from 'ember';
import layout from '../templates/components/user-message';

export default Ember.Component.extend({
  layout: layout,
  starRatingImageUrl: function(){
    return ('http://i.keen.com/D1_k3ratingstars-' + this.get("starRating") + '_V1.png');
  }.property()
  //classNames: []
});
