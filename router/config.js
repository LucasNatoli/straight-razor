'use strict';

module.exports = (app, db) => {
  app.get('/config/available-exchanges', (req, res) => {
    res.json([
      {
        name: 'Binance',
        features: ['ticker', 'candles', 'orders']
      },
      {
        name: 'Oanda',
        features: ['ticker', 'candles', 'orders']
      }
    ]);
  });
};
