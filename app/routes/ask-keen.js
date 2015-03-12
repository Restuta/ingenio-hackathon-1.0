import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return {
      messageFromAdvisors : [
        {
          id : 1,
          profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
          advisorName: "Love Expert Sara",
          postedDate: "March 10, 2015",
          messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
          starRating: "5"
        },
        {
          id : 1,
          profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
          advisorName: "Psychic Answers By Candy",
          postedDate: "March 10, 2015",
          messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
          starRating: "3"
        }
      ]
    };
  }
});
