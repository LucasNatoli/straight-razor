'use strict'

const binance = require('node-binance-api')().options({
  APIKEY: 'zzzzzz',
  APISECRET: 'zz',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
})

module.exports = (app, db) => {
  app.get('/binance/open-orders', (req, res) => {
    binance.openOrders(false, (error, openOrders) => {
      res.json(openOrders);
      console.log("openOrders()", openOrders);
    })
  })
  app.get('/binance/symbols', (releaseEvents, res) => {
    db.binance_symbol.findAll()
      .then(alertas => {
        res.json(alertas)
      })
  })
}