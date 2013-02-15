var SS = (function () {
  function Secret(text) {
    this.text = text;

    this.save = function () {
    }
  };

  Secret.all = [];
  Secret.fetchAll = function (callback) {
    $.get(
      "http://localhost/posts",
      function (data) {
        Secret.all = [];
        _.each(JSON.parse(data), function (datum) {
          Secret.all.push(new Secret(datum.name));
        });

        callback();
      }
    );
  };

  function SecretsLister(el, secrets) {
    this.render = function () {
      el.empty();

      var ul = $("<ul></ul");
      _.each(secrets, function (secret) {
        ul.append($("<li></li>").text(secret.text));
      });

      $(el).html(ul);
    };
  };

  return {
    Secret: Secret,
    SecretsLister: SecretsLister
  };
})();

$(function () {
  var secretsList = $('#secrets-list');

  SS.Secret.fetchAll(function () {
    new SecretsLister(secretsList, SS.Secret.all);
  });
});
