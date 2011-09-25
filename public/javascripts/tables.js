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

  window.TeddyTables = Backbone.Router.extend({
    routes: {
      '': 'home'
    },

    initialize: function() {
      this.sumView = new SumView({
        model: new Sum({sum: '2 x 2'})
      })
    },

    home: function() {
      var $container = $('#container');
      $container.empty();
      $container.append(this.sumView.render().el);
    }
  });

  $(function() {
    window.App = new TeddyTables();
    Backbone.history.start();
  });
})();
