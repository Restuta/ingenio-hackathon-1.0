import Ember from 'ember';

export default Ember.ObjectController.extend({
  userId: function(){
    var bound = {min: 100,max: 200};

    return Math.floor(Math.random() * (bound.max - bound.min + 1)) + bound.min;
  }.property(),
  questionAsked: '',
  answersFromAdvisors: [],
  respondingAdvisors: [],
  advisorsTyping: [],
  isQuestionSubmitted: false,
  anyAnswerPresent: function(){
    return (this.get('answersFromAdvisors').length > 0);
  }.property('answersFromAdvisors.length'),

  init: function() {
    ////Muthu - just a temporay place to mock the incoming messages from advisors
    //this.get('answersFromAdvisors').pushObject({
    //  id: 1,
    //  profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
    //  advisorId: 101,
    //  advisorName: "Love Expert Sara",
    //  postedDate: "March 10, 2015",
    //  answer: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
    //  starRating: "5"
    //});
    //
    //this.get('answersFromAdvisors').pushObject({
    //  id: 2,
    //  profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
    //  advisorId: 103,
    //  advisorName: "Psychic Answers By Candy",
    //  postedDate: "March 10, 2015",
    //  answer: "Can't say for sure, but I feel the presence of somebody important. It might be somebody from your past or nearest future. I need a little more info to tell for sure.",
    //  starRating: "4"
    //});

    this.get('advisorsTyping').push('muthudvisor');
    this.get('advisorsTyping').push('Anton advisor');
    this.get('advisorsTyping').push('krishna-advisor');
  },

  actions: {
    submitQuestion: function() {
      //todo retuta: show email box
      //this.set('isQuestionSubmitted', true);
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
        console.log('EVENT: new-advisor-answer');
        console.log(data);
      //Add the incoming message data which inturn contain advisor info
        this.get('answersFromAdvisors').pushObject(data);
    },
    'advisor-started-typing': function(advisor){
      console.log('EVENT: advisor-typing');
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
