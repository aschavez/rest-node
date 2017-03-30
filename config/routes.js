'use strict';

var controllers = require('../api/controllers');
var config = require('../config');

module.exports = function(server){
  /* User maintenance */
  server.get({path: '/users/', version: config.app.version}, controllers.user.getUsers);
  server.get({path: '/users/:id', version: config.app.version}, controllers.user.getUser);
  server.post({path: '/users/', version: config.app.version}, controllers.user.createUser);
  server.put({path: '/users/:id', version: config.app.version}, controllers.user.updateUser);
  server.del({path: '/users/:id', version: config.app.version}, controllers.user.deleteUser);
};
