'use strict';
const credential = require('credential');

function hashPassword (password) {
  return new Promise((resolve, reject) => {
    var pw = credential();
    pw.hash(password, (err, hash)=>{

      if (err) {
        reject(err);
      }else{
        resolve(hash);
      };
    });
  });
};

function verifyPassword(hash, password) {
  return new Promise(function(resolve, reject) {
    var pw = credential();
    pw.verify(hash, password, (err, isValid)=>{
      if (err) {
        reject(err);
      }else {
        resolve(isValid);
      }
    });
  });
};

module.exports = (app, db) => {
  app.post('/register', (req, res) => {
    var nombre = req.body.nombre;
    var celular = req.body.celular;
    var email = req.body.email;
    hashPassword(req.body.password).then(
      (hash)=>{
        var password = hash;
        db.cuentas.create({
          nombre: nombre,
          celular: celular,
          email: email,
          password: password
        }).then(cuenta => {
          res.json(cuenta);
        });
      },
      (err)=>{
        console.log(err);
        res.status(500).send
      }
    );

  });
  app.post('/login', (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    console.log('finding cuenta: ', email);
    db.cuentas.find({
      where: {email: email}
    }).then(cuenta => {
      var storedHash = cuenta.get('password');
      console.log('stored hash: ', storedHash);
      verifyPassword(storedHash, password).then(result => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(401).send();
        };
      }, err => {
        res.status(500).send
      });
    }, err => {
      res.status(401).send();
    });
  });
};