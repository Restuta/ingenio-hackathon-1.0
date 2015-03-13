import Ember from 'ember';

export default Ember.Controller.extend({
  //newMessage: '',
  //hasNewMessageArrived: false,

  init: function() {
    //Initialize push service object here?
  },

  actions: {
    notify: function() {
      var self = this;
      //Test calls to be removed later since we have event handlers way down
      this.notify.success({raw: self.notificationTemplateFor.consumerTyping, closeAfter: null});
      self.onQuestionArrives({question: 'What does my future looks like. I\'ve been going through a bad year that am totally lost. I need someone to help me here'});
    }
  },

  sockets: {
    'new-question-posted': function(data) {
      console.log('new question posted');
      var htmlContent = this.notificationTemplateFor.replyConsumerQuestion.replace('$question$', data.question);
      this.notify.success({raw: htmlContent, closeAfter: null}, {closeAfter: null});
    }

  },

  notificationTemplateFor: {
    //Important!!: Ensure we dont modify the HTML hierarchy here. The hacky code on application.js has some dependency when dealing with finding and deleting elements
    consumerTyping: "You will probably receive a live question related to topic 'LOVE'",
    replyConsumerQuestion: "<h4>Question from our user:</h4>$question$<br><div><textarea rows='4' cols='32'></textarea><button class='advisor-reply'>Reply</button></div>"
  },

  //Event handlers
  onQuestionArrives: function(data) {
    var htmlContent = this.notificationTemplateFor.replyConsumerQuestion.replace('$question$', data.question);
    this.notify.success({raw: htmlContent, closeAfter: null}, {closeAfter: null});
  },

  onConsumerTypesQuestion: function() {
    var self = this;
    this.notify.success(self.notificationTemplateFor.consumerTyping, {closeAfter: null});
  }

});
