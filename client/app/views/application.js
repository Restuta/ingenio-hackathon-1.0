import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    //Some ugly hack here. Who cares this when the end-result gives wow effect! :)
    //Attaching a global onClick handler on the <Body> level. But post answer only happens on button click
    $('body').on('click', function(e) {
      var $clickedElement = $(e.target);
      if ($clickedElement.prop("tagName").toLowerCase() === 'button' && $clickedElement.hasClass('advisor-reply')) {
        var reply = $clickedElement.prev().val();
        self.postAnswer({advisorId: 1234, answer: reply});
        self.closeNotification($clickedElement);
      }
    });
  },

  postAnswer: function(data) {
    console.log('Posting answer..');
    console.log(data);
    //TODO: Muthu-Socket-io call to post answer to the consumer
  },
  closeNotification: function($buttonElement) {
    $buttonElement.parent().parent().parent().remove();
  }

});

