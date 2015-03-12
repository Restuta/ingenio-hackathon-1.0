import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    this.$('body').on('click', function(e) {
      console(self.$(e.target));
    });
  }
});


/* we use global click handler to hide any popups we find on the page */
/*$('body').on('click', function(e) {
  if ($('.popover').length > 0) {
    //todo restuta: this is a hack, we cannot afford to do this for all pages where we will need multiple pop-ups
    $('.editable-list-content').each(function() {

      // e.target is not the element which triggers the popup
      // the popover doesn't contain the target : Which means that we are not clicking inside the popover
      if (!$(this).is(e.target)
        && $(this).has(e.target).length === 0
        && $('.popover').has(e.target).length === 0
      ) {
        $(this).popover('hide');
      }
    });
  }
});*/
