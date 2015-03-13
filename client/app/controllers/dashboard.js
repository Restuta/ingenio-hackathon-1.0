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
    checkItOut: function() {
      this.questionPopup = this.get('questionFormNotification').success({closeAfter: null});
      this.preQuestionPopup.set('visible', false);
      $('#overlay-back').fadeIn(500);
    },
    sendReply: function() {
      this.questionPopup.set('visible', false);
    },
    preQuestionFormClosed: function() {

    },
    questionFormClosed: function() {
      $('#overlay-back').fadeOut(500);
    }
  },

  sockets: {
    'consumer-started-typing': function() {
      this.preQuestionPopup = this.get('preQuestionNotification').success({closeAfter: null});
    },

    'new-question-posted': function() {
      this.set('canReply', true);
      this.set('preQuestionMessage', 'Somebody just posted a question!');
    },

    'consumer-pressed-key': function(data) {
      //this.get('questionFormNotification').success({closeAfter: null});
      this.set('questionText', data.value);
    }
  }
});
