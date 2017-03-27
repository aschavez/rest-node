'use strict';

module.exports = {
  name: process.env.APPNAME || 'API Rest',
  port: process.env.PORT || 8000,
  version: process.env.APPVERSION || '1.0.0',
  env: process.env.NODE_ENV || 'development',
  pageLimit: 10
};
