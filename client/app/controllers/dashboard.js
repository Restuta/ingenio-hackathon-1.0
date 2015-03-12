import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    //Initialize push service object here?
  },
  actions: {
  notify: function(){
    this.notify.info("This is a notification form a consumer. You got to take some action");
  }
  }
});
