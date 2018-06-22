const express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./db'),
  router = require('./router'),
  session = require('express-session')

const app = express()
const PORT = process.env.PORT

// 
// var sess = {
//     secret: 'shhhh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {}
// }

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(session(sess))
// app.use((req, res, next) => {
//   res.header('Content-Type', 'application/json');
//   next();
// });
app.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
})
router(app, db)

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
  console.log('db sync ok')
  app.listen(PORT, () => {
    console.log('Raz0r listening on port:', PORT)
  })
})
