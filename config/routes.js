'use strict';

var controllers = require('../api/controllers');
var config = require('../config');

module.exports = function(server){
  server.get({path: '/users/', version: config.app.version}, controllers.user.getUsers);
  server.get({path: '/users/:id', version: config.app.version}, controllers.user.getUser);
};
