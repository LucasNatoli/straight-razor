'use strict';

module.exports = (app, db) => {
  app.get('/favoritos', (req, res) => {
    db.favoritos.findAll()
      .then(favoritos => {
        res.json(favoritos);
      });
  });
};
