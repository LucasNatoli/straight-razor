'use strict';
const credential = require('credential')

function hashPassword (password) {
  return new Promise((resolve, reject) => {
    var pw = credential()
    pw.hash(password, (err, hash)=>{

      if (err) {
        reject(err)
      }else{
        resolve(hash)
      }
    })
  })
}

function verifyPassword(hash, password) {
  return new Promise(function(resolve, reject) {
    var pw = credential()
    pw.verify(hash, password, (err, isValid)=>{
      if (err) {
        reject(err)
      }else {
        resolve(isValid)
      }
    })
  })
}

module.exports = (app, db) => {
  app.post('/checkmail', (req, res) => {
    var email = req.body.email;
    // chequear si ya existe el email
    console.log('finding: ', email);
    db.cuenta.findOne({where: {email: email}}).then(account => {
      console.log(account)
      res.send(account)
    })

  })
  app.post('/register', (req, res) => {
    var nombre = req.body.nombre;
    var celular = req.body.celular;
    var email = req.body.email;
    hashPassword(req.body.password).then(
      (hash)=>{
        var password = hash;
        db.cuenta.create({
          nombre: nombre,
          celular: celular,
          email: email,
          password: password
        }).then(cuenta => {
          res.status(200).end()
        })
      },
      (err)=>{
        console.log(err)
        res.status(500).send
      }
    )

  })
  app.post('/login', (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    console.log('finding cuenta: ', email)
    db.cuenta.find({
      where: {email: email}
    }).then(cuenta => {
      if (cuenta) {
        var storedHash = cuenta.get('password')
        console.log('stored hash: ', storedHash)
        verifyPassword(storedHash, password).then(result => {
          if (result) {
            var sess = req.session
            sess.email = email
            sess.nombre = result.nombre
            //sess.userid =
            sess.save
            res.status(200).end()
          } else {
            // No coincide el password
            res.status(401).send()
          }
        }, err => {
          // No se puedo verificar el hash
          res.status(500).send
        })
      } else {
          // No existe el email en la base de datos
          res.status(401).send()
      }
    }, err => {
      // No se pudo hascer la busqueda en la base de datos
      res.status(500).send()
    })
  })
  app.get('/logout', (req, res) => {
    var sess = req.sess
    console.log('sess', sess);
    if (sess) {
      sess.destroy()
    }
    res.status(200).send()
  })

}
