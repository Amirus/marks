'use strict';
var Model         = require('../model');
var Store         = require('../store');

var UserModel = Model.extend({

});

var UsersStore = Store.extend({
  fetch: function(id) {
    var self = this;

    self.request('get', '/api/users/' + id, function(err, result) {
      var user = new UserModel(result);
      self.trigger('fetch_result', user);
    });
  }
});

var usersStore = new UsersStore();
module.exports = usersStore;
module.exports.Model = UserModel;
