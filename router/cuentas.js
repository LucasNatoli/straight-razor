'use strict';

module.exports = (app, db) => {
  app.post('/register', (req, res) => {
    var nombre = req.body.nombre;
    var celular = req.body.celular;
    var email = req.body.email;
    var password = req.body.password;
    res.status(200).send();
  });
};
