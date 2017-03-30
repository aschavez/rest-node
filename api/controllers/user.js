'use strict';

var models = require('../models'),
    errors = require('restify-errors');

/* Collection of Users */
exports.getUsers = function(req, res, next) {
  var params = req.pms;
  params.attributes = req.pms.attributes || {
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
    next(new errors.HTTPException(err));
  });
};

/* User resource */
exports.getUser = function(req, res, next) {
  var id = req.params.id;
  models.User.findById(id).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'User not found'
    }));
  });
};

/* User Creation */
exports.createUser = function(req, res, next) {
  var data = req.body;
  models.User.create(data).then(function(result) {
    res.json(result.dataValues);
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};

/* User update */
exports.updateUser = function(req, res, next) {
  var id = req.params.id;
  var data = req.body;
  models.User.findById(id).then(function(result) {
    result.updateAttributes(data).then(function(result) {
      res.json(result.dataValues);
    }).catch(function(err) {
      next(new errors.HTTPException(err));
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'User not found'
    }));
  });
};

/* User deletion */
exports.deleteUser = function(req, res, next) {
  var id = req.params.id;
  models.User.destroy({
    where: { id: id }
  }).then(function(result) {
    res.json({
      deleted: result
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};
