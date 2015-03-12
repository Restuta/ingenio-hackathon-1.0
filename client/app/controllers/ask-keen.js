import Ember from 'ember';

export default Ember.ObjectController.extend({
  init: function(){
    //Muthu - just a temporay place to mock the incoming messages from advisors
    this.onReceiveAnswer({
      id : 1,
      profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
      advisorId: 101,
      advisorName: "Love Expert Sara",
      postedDate: "March 10, 2015",
      messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
      starRating: "5"
    });

    this.onReceiveAnswer({
      id : 1,
      profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
      advisorId: 103,
      advisorName: "Psychic Answers By Candy",
      postedDate: "March 10, 2015",
      messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
      starRating: "3"
    });
  },
  questionAsked: '',
  answersFromAdvisors : [],
  respondingAdvisors: [],
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
      //TODO: muthu - there will be a selected advisorid coming in through the action from component. pass it as querystring
    }
  },

  /////////// Event handlers for push service events /////////////
  /*This method will  be called when ever we receive an incoming message through push notifier*/
  onReceiveAnswer: function(message){
    console.log(message);
    this.get('answersFromAdvisors').pushObject(message);
  },

  whenAdvisorTypes: function(advisorName){
    console.log('Advisor ' + advisorName + ' typing');
    //Add to a list of responding advisors
    this.get('respondingAdvisors').pushObject(advisorName);

  },

  whenAdvisorStopsTyping: function(advisorName){
    console.log('Advisor ' + advisorName + 'stopped typing');
    //Remove from the list respondingAdvisors
  }

});
