const express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./db'),
  router = require('./router');

const app = express();
const PORT = 3000; //env.PORT;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router(app, db);

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
  console.log('db sync ok');
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});
