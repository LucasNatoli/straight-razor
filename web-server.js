const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

const db = require('./db')
const router = require('./router')
const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  store: new SQLiteStore({dir: '.sqlite3', db: 'sess.db'}),
  secret: 'DuM0R4z0r',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}))

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
