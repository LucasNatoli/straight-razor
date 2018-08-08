'use strict'

const routes = [
  require('./alertas'),
  require('./cuentas'),
  require('./binance')
];

// Add access to the app and db objects to each route
module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
