(function() {
  window.Sum = Backbone.Model.extend({
  });

  window.SumView = Backbone.View.extend({
    tagName: 'span',

    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#sum-template').html());
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
