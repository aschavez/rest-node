'use strict';

/* Module Dependencies */
var restify = require('restify'),
    versioning = require('restify-url-semver'),
    config = require('./config'),
    middlewares = require('./api/middlewares'),
    errors = require('restify-errors');

/* Initialize Server */
global.server = restify.createServer({
  name: config.app.name,
  version: config.app.version
});

/* Versioning */
server.pre(versioning());

/* Middleware */
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(middlewares.paramParser);
// server.use(restify.fullResponse());

/* Error Handling */
errors.makeConstructor('HTTPException', { statusCode: 500 });
server.on('HTTPException', middlewares.httpException);

/* Routes */
var routes = require('./config/routes')(server);

/* Lift server */
server.listen(config.app.port, function() {
  console.log(server.name + ' is now running in port ' + config.app.port);
});
