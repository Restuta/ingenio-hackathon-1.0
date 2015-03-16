import Ember from 'ember';

export default Ember.ObjectController.extend({
  userId: function() {
    var bound = {min: 100, max: 200};

    return Math.floor(Math.random() * (bound.max - bound.min + 1)) + bound.min;
  }.property(),
  questionAsked: '',
  answersFromAdvisors: [],
  respondingAdvisors: [],
  advisorsTyping: [],
  isQuestionSubmitted: false,
  anyAnswerPresent: function() {
    return (this.get('answersFromAdvisors').length > 0);
  }.property('answersFromAdvisors.length'),

  actions: {
    submitQuestion: function() {
      //todo retuta: show email box
      this.set('isQuestionSubmitted', true);
      this.socket.emit('new-question-posted', {userId: 1234, question: this.get('questionAsked')});
    },
    onInputChange: function(sender, value) {
      this.socket.emit('consumer-pressed-key', {value: value});
    },
    startedTyping: function() {
      console.log('consumer-started-typing');
      this.socket.emit('consumer-started-typing', {});
    }
  },

  sockets: {
    'new-advisor-answer': function(data) {
      this.get('answersFromAdvisors').pushObject(data);
      this.get('advisorsTyping').removeObject(data.advisorName);
    },
    'advisor-pressed-key': function(data) {
      if (!this.get('advisorsTyping').contains(data.advisorName)) {
        this.get('advisorsTyping').pushObject(data.advisorName);
      }
    },
    'advisor-started-typing': function(advisor) {
      console.log(advisor);
      //Add to a list of responding advisors
      this.get('respondingAdvisors').pushObject(advisor.name);
    },
    connect: function() {
      console.log('Sockets connected...');
    },
    disconnect: function() {
      console.log('Sockets disconnected...');
    }
  }

  //whenAdvisorStopsTyping: function(advisorName) {
  //  console.log('Advisor ' + advisorName + 'stopped typing');
  //  //Remove from the list respondingAdvisors
  //}

});
