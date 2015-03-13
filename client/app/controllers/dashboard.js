import Ember from 'ember';

export default Ember.ObjectController.extend({
  queryParams: ['advisorid'],
  advisorid: null,  //Need to have this property to match the case of querystring which is bad :(
  advisorId: function(){
    //This is the same as 'advisor' property , but in a camelCase form
    return this.get('advisorid');
  },
  needs: ['application'],
  init: function () {
    //Initialize push service object here?
  },

  actions: {
    notify: function(){
      var self = this;
      //Test calls to be removed later since we have event handlers way down
      this.notify.success({raw: self.notificationTemplateFor.consumerTyping, closeAfter: null});
      self.onQuestionArrives({question: 'What does my future looks like. I\'ve been going through a bad year that am totally lost. I need someone to help me here'});
      console.log(this.get('controllers.application.currentRouteName'));
      console.log(this.get('advisorId'));
    }
  },

  notificationTemplateFor:{
    //Important!!: Ensure we dont modify the HTML hierarchy here. The hacky code on application.js has some dependency when dealing with finding and deleting elements
    consumerTyping: "You will probably receive a live question related to topic 'LOVE'",
    replyConsumerQuestion: "<h4>Question from our user:</h4>$question$<br><div><textarea rows='4' cols='32'></textarea><button class='advisor-reply'>Reply</button></div>"
  },

  //Event handlers
  onQuestionArrives: function (data) {
    //Show the form with reply only for dashboard page
    if (this.get('controllers.application.currentRouteName') === 'dashboard') {
      var htmlContent = this.notificationTemplateFor.replyConsumerQuestion.replace('$question$', data.question);
      this.notify.success({raw: htmlContent, closeAfter: null}, {closeAfter: null});
    }
  },

  onConsumerTypesQuestion: function () {
    var self = this;
    this.notify.success(self.notificationTemplateFor.consumerTyping, {closeAfter: null});
  }


});
