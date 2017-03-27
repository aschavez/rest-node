'use strict';

/* Module Dependencies and Connection */
var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('require-no-cache')('../../config'),
    sequelize = new Sequelize(config.connections[config.app.env]),
    db = {};

/* Model imports */
fs.readdirSync(__dirname)
  .filter(function(file){
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file){
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

/* Relations */
Object.keys(db).forEach(function(modelName) {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* Exports */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
