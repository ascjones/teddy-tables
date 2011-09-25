(function() {
  window.Sum = Backbone.Model.extend({
    initialize: function(){
      var x, y;
      var generateRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      x = generateRandom(1,20);
      y = generateRandom(1,20);
      this.set({x: x, y: y, answer: x * y});
    },

    markAnswer: function(answer) {
      if (this.get('answer').toString() === answer) {
        this.set({correctness: "It's the right answer!"});
      }
      else{
        this.set({correctness: "Teddy says - wrong: try again!"});
      } 
    }
  });

  window.SumView = Backbone.View.extend({
    tagName: 'span',

    initialize: function() {
      _.bindAll(this, 'render', 'markAnswer', 'setCorrect');
      this.template = _.template($('#sum-template').html());
      this.model.bind("change:correctness", this.setCorrect);
    },

    events: {
      "submit #answer-form" : "markAnswer"
    },

    markAnswer: function() {
      var val = this.$("input").val();
      this.model.markAnswer(val);
      // stop the form from submitting
      event.preventDefault();
    },

    setCorrect: function() {
      this.$('.answer').html(this.model.get('correctness'));
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
