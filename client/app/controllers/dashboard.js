import Ember from 'ember';
import Notify from '../utils/notify';

export default Ember.Controller.extend({
  //defining
  preQuestionNotification: Notify.property(),
  questionFormNotification: Notify.property(),
  whatsYourNameNotification: Notify.property(),
  canReply: false,
  preQuestionMessage: 'Somebody is typing a question...',
  queryParams: ['advisorId'],
  advisorId: null,  //Need to have this property to match the case of querystring :(
  answer: '',
  userStillTypingText: 'They are still typing...',
  advisorName: '',


  init: function() {
    this.namePopup = this.get('whatsYourNameNotification').success({closeAfter: null});
  },

  actions: {
    checkItOut: function() {
      this.questionPopup = this.get('questionFormNotification').success({closeAfter: null});
      this.preQuestionPopup.set('visible', false);
      $('#overlay-back').fadeIn(500);
    },
    sendReply: function() {
      this.questionPopup.set('visible', false);

      this.socket.emit('new-advisor-answer', {
        advisorId: this.get('advisorId'),
        answer: this.get('answer')
      });
    },
    preQuestionFormClosed: function() {

    },
    questionFormClosed: function() {
      $('#overlay-back').fadeOut(500);
    },
    saveAdvisorName: function() {
      this.namePopup.set('visible', false);
      this.socket.emit('advisor-name-set', {
        advisorName: this.get('advisorName')
      })
    }
  },

  onReplyChange: function() {
    this.socket.emit('advisor-pressed-key', {
      value: this.get('answer'),
      advisorId: this.get('advisorId'),
      advisorName: this.get('advisorName')
    });
  }.observes('answer'),

  sockets: {
    'consumer-started-typing': function() {
      this.preQuestionPopup = this.get('preQuestionNotification').success({closeAfter: null});
    },

    'new-question-posted': function(data) {

      this.set('questionText', data.question);

      this.set('canReply', true);
      this.set('preQuestionMessage', 'Somebody just posted a question!');
      this.set('userStillTypingText', 'They are waiting for your reply!');
    },

    'consumer-pressed-key': function(data) {
      //this.get('questionFormNotification').success({closeAfter: null});
      this.set('questionText', data.value + '...');
    },
    'advisor-assigned': function(advisor) {
      this.set('advisorId', advisor.advisorId);
    }
  }
});
