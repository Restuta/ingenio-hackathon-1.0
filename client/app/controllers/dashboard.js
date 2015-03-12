import Ember from 'ember';

export default Ember.Controller.extend({
  //newMessage: '',
  //hasNewMessageArrived: false,

  init: function () {
    //Initialize push service object here?
  },
  notificationTemplateFor:{
    consumerTyping: "You will probably receive a live question related to topic 'LOVE'",
    replyConsumerQuestion: "<h4>Question from our user:</h4>What does my future looks like. I've been going through a bad year that am totally lost. " +
    "I need someone to help me here" +
    "<br><div></div><textarea rows='4' cols='32'></textarea><button class='advisor-reply'>Reply</button></div>"
  },
  actions: {
    notify: function(){
      var self = this;
      this.notify.success({raw: self.notificationTemplateFor.consumerTyping, closeAfter: null});
      this.notify.success({raw: self.notificationTemplateFor.replyConsumerQuestion, closeAfter: null}, {closeAfter: null});
    }
  }

});
