import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions:{
    startChat: function () {
      this.transitionToRoute('chat');
    }
  }
});
