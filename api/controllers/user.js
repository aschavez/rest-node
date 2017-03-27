'use strict';

var models = require('../models'),
    sequelize = models.sequelize,
    errors = require('restify-errors');

/* Collection of Users */
exports.getUsers = function(req, res, next) {
  var params = req.pms;
  params.attributes = {
    exclude: ['password', 'loginAttempts', 'createdAt', 'updatedAt']
  };
  models.User.findAndCountAll(params).then(function(result) {
    var metadata = { count: result.count };
    if (params.offset) { metadata.offset = params.offset };
    if (params.limit) { metadata.limit = params.limit };
    res.json({
      metadata: metadata,
      response: result.rows
    });
  }).catch(function(err) {
    next(new errors.HTTPException({ statusCode: 400 }));
  });
};

/* User resource */
exports.getUser = function(req, res, next) {
  var id = req.params.id;
  models.User.findById(id).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(new errors.HTTPException({
      statusCode: 404,
      message: 'User not found'
    }));
  });
};
