import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.Object.create({
      questionAsked:'Will I find my love?',
      messageFromAdvisors : [
        {
          id : 1,
          profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
          advisorId: 101,
          advisorName: "Love Expert Sara",
          postedDate: "March 10, 2015",
          messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
          starRating: "5"
        },
        {
          id : 1,
          profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
          advisorId: 103,
          advisorName: "Psychic Answers By Candy",
          postedDate: "March 10, 2015",
          messageText: "Can't say for sure, but I feel the presence of somebody important. It might be somebody from your past or nearest future. I need a little more info to tell for sure.",
          starRating: "4"
        }
      ]
    });
  }
});
