'use strict'

const routes = [
  require('./favoritos')
];

// Add access to the app and db objects to each route
module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
