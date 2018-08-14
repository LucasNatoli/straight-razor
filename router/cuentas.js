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

function findByEmail(email, cuenta){
  return new Promise(function(resolve, reject) {
    cuenta.findOne({
      where: {email: email}
    }).then(
      account => {
        resolve(account)
      },
      err => {
        reject(err)
      }
    )
  })
}

module.exports = (app, db) => {
  app.post('/checkmail', (req, res) => {
    var email = req.body.email;
    // chequear si ya existe el email
    console.log('finding: ', email)
    findByEmail(email, db.cuenta).then(
      account => {
        console.log(account)
        res.send(account)
      },
      err => {
        console.log('error findByEmail', err);
        res.status(500)
      }
    )

  })

  app.post('/register', (req, res) => {
    var nombre = req.body.nombre;
    var celular = req.body.celular;
    var email = req.body.email;
    console.log('finding email', email);
    findByEmail(email, db.cuenta).then(
      account => {
        if(account){
          // El email existe
          console.log('email existe');
          res.status(401).send() //TODO: Investigar que codigo de error se devuelve por cuenta publicada
        } else {
          // se puede crear la cuenta
          console.log('email no existe, crear cuenta');
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
        }
      }
    )


  })

  app.post('/login', (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    console.log('finding cuenta: ', email)
    findByEmail(email, db.cuenta).then(
      cuenta => {
        if (cuenta) {
          var storedHash = cuenta.get('password')
          console.log('stored hash: ', storedHash)
          verifyPassword(storedHash, password).then(
            result => {
              if (result) {
                var sess = req.session
                sess.email = email
                sess.nombre = result.nombre
                sess.save
                res.status(200).end()
              } else {
                // No coincide el password
                res.status(401).send()
              }
            },
            err => {
              // No se puedo verificar el hash
              res.status(500).send
            }
          )
        } else {
          // No existe el email en la base de datos
          res.status(401).send()
        }
      },
      err => {
        // No se pudo hacer la busqueda en la base de datos
        res.status(500).send()
      }
    )
  })

  app.get('/logout', (req, res) => {
    req.session = null
    res.status(200).send()
  })

  app.get('/check-session', (req, res) => {
    
    var sess = req.session
    if (sess.email) {   
      res.status(200).send([
        {
          serverTime: (new Date).getTime()
        }
      ])      
    } else {
      res.status(401).send()
    }
  })
}
