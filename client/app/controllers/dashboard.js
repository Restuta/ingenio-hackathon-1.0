import Ember from 'ember';
import Notify from '../utils/notify';

export default Ember.ObjectController.extend({
  needs: ['application'],
  queryParams: ['advisorid'],
  advisorid: null,  //Need to have this property to match the case of querystring :(
  init: function() {
    //Initialize push service object here?
  },

  actions: {
    notify: function() {
      var self = this;
      //Test calls to be removed later since we have event handlers way down
      this.notify.success({raw: self.notificationTemplateFor.consumerTyping, closeAfter: null});
      self.onQuestionArrives({question: 'What does my future looks like. I\'ve been going through a bad year that am totally lost. I need someone to help me here'});
      Notify.success({closeAfter: null});
      //Test calls to be removed later since we have event handlers way down
      this.notify.success({raw: self.notificationTemplateFor.consumerTyping, closeAfter: null});
      self.onQuestionArrives({question: 'What does my future looks like. I\'ve been going through a bad year that am totally lost. I need someone to help me here'});
      console.log(this.get('controllers.application.currentRouteName'));
      console.log(this.get('advisorId'));
    },
    //TODO: Muthu test method to send messages to ask-keen page
    sendAnswer: function(advisorAnswer) {
      this.socket.emit('new-advisor-answer', {advisorId: this.get('advisorid'), answer: advisorAnswer});
    }
  },

  sockets: {
    'consumer-started-typing': function() {
      Notify.success({closeAfter: null});
    },

    'new-question-posted': function(data) {
      console.log('new question posted');
      Notify.success({closeAfter: null});
    },

    'consumer-pressed-key': function(data) {
        this.set('questionText', data.value);
    }
  },
  //TODO: Muthu test answers to ask-keen page
  testAnswers: {
    answer1: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
    answer2: "Can't say for sure, but I feel the presence of somebody important. It might be somebody from your past or nearest future. I need a little more info to tell for sure"
  }

});
