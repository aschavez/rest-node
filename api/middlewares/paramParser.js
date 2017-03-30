var _ = require('lodash'),
    config = require('../../config');

var models = require('../models'),
    sequelize = models.sequelize,
    Sequelize = models.Sequelize;

module.exports = function(req, res, next) {
  /* Method GET */
  if (req.method === 'GET') {
    /* Defaults */
    var pms = {
      limit: config.app.pageLimit
    };
    /* Offset */
    if (offset = req.query.offset) {
      pms.offset = parseInt(offset);
      delete req.query.offset;
    }
    /* Limit */
    if (limit = req.query.limit) {
      pms.limit = parseInt(limit);
      delete req.query.limit;
    }
    /* Order */
    if (sort = req.query.sort) {
      var sortData = [];
      _.map(sort.split(','), function(s) {
        if (s.substring(0, 1) === '-') {
          s = [s.substring(1), "DESC"];
        }
        if (s) { sortData.push(s) };
      });
      pms.order = sortData;
      delete req.query.sort;
    }
    /* Attributes */
    if (fields = req.query.fields) {
      pms.attributes = fields.split(',');
      delete req.query.fields;
    }
    /* Filtering */
    if (filters = req.query) {
      var queryData = {};
      _.map(filters, function(val, key) {
        var filter = evalFilter(val, key);
        _.merge(queryData, filter);
      });
      pms.where = queryData;
    }
    req.pms = pms;
  }
  next();
};

/* Eval filter */
var evalFilter = function(val, key) {
  var filterParts = key.split('__');
  var filter = {};
  if (_.size(filterParts) > 1) {
    var operator = filterParts[1];
    var key = filterParts[0];
    switch(operator) {
      case 'eq':
        val = (val.match(/^(true|false)$/)) ? (val == 'true') : val;
        filter[key] = { $eq: val };
        break;
      case 'gt':
        filter[key] = { $gt: val };
        break;
      case 'gte':
        filter[key] = { $gte: val };
        break;
      case 'lt':
        filter[key] = { $lt: val };
        break;
      case 'lte':
        filter[key] = { $lte: val };
        break;
      case 'ne':
        filter[key] = { $ne: val };
        break;
      case 'not':
        val = (val.match(/^(true|false)$/)) ? (val == 'true') : val;
        filter[key] = { $not: val };
        break;
      case 'range':
        val = val.split(',');
        filter[key] = { $between: _.take(val, 2) };
        break;
      case 'not_range':
        val = val.split(',');
        filter[key] = { $notBetween: _.take(val, 2) };
        break;
      case 'in':
        val = val.split(',');
        filter[key] = { $in: val };
        break;
      case 'not_in':
        val = val.split(',');
        filter[key] = { $notIn: val };
        break;
      case 'like':
        filter[key] = { $like: val };
        break;
      case 'not_like':
        filter[key] = { $notLike: val };
        break;
    }
  } else {
    filter[key] = val;
  }
  return filter;
};
