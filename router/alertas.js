'use strict';

module.exports = (app, db) => {
  app.get('/alertas', (req, res) => {
    db.alerta.findAll()
      .then(alertas => {
        res.json(alertas);
      });
  });
};
