import Ember from 'ember';

export default Ember.ObjectController.extend({
  isQuestionSubmitted: false,
  actions:{
    submitQuestion: function () {
      //When the consumer is done with subitting the question by hitting the "Ask the advisors" button, we disable question box
      //At this point lets keep it simple and not worry about big questions and whether to show it in a textarea or not. Just to save some time
      this.set('isQuestionSubmitted',true);
      console.log(this.get('questionAsked'));
    },
    startChat: function () {
      this.transitionToRoute('chat');
    }
  }
});
