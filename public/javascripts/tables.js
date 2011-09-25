(function() {
  window.Sum = Backbone.Model.extend({
    initialize: function(){
      var x, y;
      var generateRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      x = generateRandom(1,20);
      y = generateRandom(1,20);
      this.set({sum: x.toString() + ' x ' +  y.toString()});
    }
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
      this.currentSum = new Sum();
      this.sumView = new SumView({
        model: this.currentSum
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
