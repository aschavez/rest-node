var _ = require('lodash'),
    config = require('../../config');

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
    }
    /* Limit */
    if (limit = req.query.limit) {
      pms.limit = parseInt(limit);
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
    }
    req.pms = pms;
    next();
  }
};
