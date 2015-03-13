import Ember from 'ember';
import Notify from '../utils/notify';

export default Ember.Controller.extend({
  //defining
  preQuestionNotification: Notify.property(),
  questionFormNotification: Notify.property(),
  canReply: false,
  preQuestionMessage: 'Somebody is typing a question...',
  queryParams: ['advisorid'],
  advisorid: null,  //Need to have this property to match the case of querystring :(

  actions: {
    notify: function() {
      this.get('preQuestionNotification').success({closeAfter: null});
    },
    checkItOut: function() {
      this.questionPopup = this.get('questionFormNotification').success({closeAfter: null});
      this.preQuestionPopup.set('visible', false);
      $('#overlay-back').fadeIn(500);
    },

  actions: {
    notify: function() {
      var self = this;
      Notify.success({closeAfter: null});
    sendReply: function() {
      this.questionPopup.set('visible', false);
    },

    preQuestionFormClosed: function() {
      console.log('pre-question form closed');
    },
    questionFormClosed: function() {
      console.log('question form closed');
      $('#overlay-back').fadeOut(500);
    }
  },

  sockets: {
    'consumer-started-typing': function() {
      this.preQuestionPopup = this.get('preQuestionNotification').success({closeAfter: null});
    },

    'new-question-posted': function(data) {
      this.set('canReply', true);
      this.set('preQuestionMessage', 'Somebody just posted a question!');
    },

    'consumer-pressed-key': function(data) {
      //this.get('questionFormNotification').success({closeAfter: null});
      this.set('questionText', data.value);
    }
  },
  //TODO: Muthu test answers to ask-keen page
  testAnswers: {
    answer1: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
    answer2: "Can't say for sure, but I feel the presence of somebody important. It might be somebody from your past or nearest future. I need a little more info to tell for sure"
  }

});
