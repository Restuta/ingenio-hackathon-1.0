import Ember from 'ember';

var Advisor = Ember.Object.extend({
  name: '',
  answerMask: ''
});

export default Ember.ObjectController.extend({
  userId: function() {
    var bound = {min: 100, max: 200};

    return Math.floor(Math.random() * (bound.max - bound.min + 1)) + bound.min;
  }.property(),
  questionAsked: '',
  answersFromAdvisors: [],
  advisorsTyping: [],
  isQuestionSubmitted: false,
  consumerStartedTyping: false,

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
      this.socket.emit('consumer-started-typing', {});
      this.set('consumerStartedTyping', true);
    }
  },

  sockets: {
    'new-advisor-answer': function(data) {
      this.get('answersFromAdvisors').pushObject(data);

      var advisor = this.get('advisorsTyping').findBy('name', data.advisorName);
      this.get('advisorsTyping').removeObject(advisor);
    },

    'advisor-pressed-key': function(data) {

      //var maskedAnswer = this._getMaskedString(data.value, '*');
      var maskedAnswer = data.value;
      console.log(data.value);

      if (!this.get('advisorsTyping').isAny('name', data.advisorName)) {
        this.get('advisorsTyping').pushObject(Advisor.create({
          name: data.advisorName,
          answerMask: maskedAnswer
        }));
      } else {
        var advisor = this.get('advisorsTyping').findBy('name', data.advisorName);
        advisor.set('answerMask', maskedAnswer);
      }
    },

    connect: function() {
      console.log('Sockets connected...');
    },

    disconnect: function() {
      console.log('Sockets disconnected...');
    }
  },

  _getMaskedString(originalString, maskingCharacter) {
    return originalString.replace(/\w/g, maskingCharacter);
  }

});
