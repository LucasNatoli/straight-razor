'use strict';

module.exports = (app, db) => {
  app.get('/alarms', (req, res) => {
    db.alarm.findAll()
      .then(alarms => {
        res.json(alarms);
      });
  });
};
