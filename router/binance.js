'use strict'

const binance = require('node-binance-api')().options({
  APIKEY: 'op3aC9FMVNntfbmLeG95qdLuXAcBuzGAdnzwRfx49VasESp39SAn8RUzCWAYoeW0',
  APISECRET: 'oE51S3EhKSwpBRPUysYEXloncza7KwSyTtriFOhJGoO3MNFBC7IJEtnfwCXGDejG',
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
}