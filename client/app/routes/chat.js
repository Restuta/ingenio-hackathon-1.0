import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition){
    console.log(transition.queryParams.test);
    this.set('queryParams', transition.queryParams);
  },
  setupController: function(controller, model) {
    console.log(this.get('queryParams'));
    controller.set('model', {
      advisorId: 101,
      profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/54165337-1629739034.jpg",
      advisorName: "Intutive advisor",
      postedDate: "March 13, 2015",
      starRating: "5",
      pricePerMinute: ".99",
      question: this.get('queryParams').question,
      answer: this.get('queryParams').answer
    });
  }
});
