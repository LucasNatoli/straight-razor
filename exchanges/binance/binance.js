/* 
https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md
*/

const axios = require("axios")
const sequelize = require('sequelize');
const db = new sequelize(
  'razor',
  'root',
  'Kalama2018',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
      underscored: true
    },
    logging: false
  }
)
const binance_tick = require('./binance_tick')(db, sequelize)
const binance_candle = require('./binance_candle')(db, sequelize)
const binance_symbol = require('./binance_symbol')(db, sequelize)
const baseEndpoint = "https://api.binance.com" 

function Binance(){
  var intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h','12h', '1d' ,'3d' , '1w' , '1M']
  db.sync()
  .then(
    (res)=> {
      console.log("conectado a la db")      
    },
    (err) => {
      console.log('db error:', err)
    }
  )
}

Binance.prototype.queryExchange = function (endpoint, params){
  return new Promise(
    (resolve, reject) => {
      axios.get(baseEndpoint + endpoint, {
        headers: {
          'content-type': 'application/json'
        },
        params: params
      }).then(
        function(response){
          var results = {
            status: response.status,
            data: response.data
          }
          resolve(results)
        },
        function(err){
          reject(err);
        }
      )
    }
  ) 
}

Binance.prototype.ping = function () {  
  this.queryExchange('/api/v1/ping').then(
    (res) => {
      if (res.status===200) {
        console.log('pong')
      }
    },
    (err) => {
      console.log(err.Error)
    }
  )
}

Binance.prototype.getServerTime = function () {  
  this.queryExchange('/api/v1/time').then(
    (res) => {
      if (res.status===200) {
        console.log(res.data.serverTime)
      }
    },
    (err) => {
      console.log(err.Error)
    }
  )
}

Binance.prototype.getExchangeInfo = function () {
  this.queryExchange('/api/v1/exchangeInfo')
  .then(
    (res) => {
      if (res.status===200) {
        let symbols = res.data.symbols
        for (var i=0; i<symbols.length; i++) {
          let s = symbols[i]
          binance_symbol.findOrCreate({
            where: {
              symbol: s.symbol
            },
            defaults: {
              symbol: s.symbol,
              baseAsset: s.baseAsset,
              baseAssetPrecision: s.baseAssetPrecision,
              quoteAsset: s.quoteAsset,
              quoteAssetPrecision: s.quoteAssetPrecision
            }
          })
          .spread((symbol, created)=>{
            if(created){
              console.log('symbol creado:', symbol.get({plain: true}))
            }
          })
        }
      }
    },
    (err) => {
      console.log(err)
    }
  )
}

Binance.prototype.update24hrTicker = function (coin, asset) {
  return new Promise(
    (resolve, reject) => {
      this.queryExchange(
        '/api/v1/ticker/24hr', 
        {symbol: asset + coin}
      ).then(
        (res) => {
          if (res.status===200) {
            let data = res.data
            binance_tick.findOrCreate({
              where: {
                symbol: data.symbol,
                openTime: data.openTime,
                closeTime: data.closeTime
              }, 
              defaults: {
                symbol: data.symbol,
                priceChange: data.priceChange,
                priceChangePercent: data.priceChangePercent,
                weightedAvgPrice: data.weightedAvgPrice,
                prevClosePrice: data.prevClosePrice,
                lastPrice: data.lastPrice,
                lastQty: data.lastQty,
                bidPrice: data.bidPrice,
                bidQty: data.bidQty,
                askPrice: data.askPrice,
                askQty: data.askQty,
                openPrice: data.openPrice,
                highPrice: data.highPrice,
                lowPrice: data.lowPrice,
                volume: data.volume,
                quoteVolume: data.quoteVolume,
                openTime: data.openTime,
                closeTime: data.closeTime,
                firstId: data.firstId,
                lastId: data.lastId,
                count: data.count
              }
            })
            .spread((tick, created)=> {
              if (created) console.log(tick.get({plain:true}))
            })
          }
        },
        (err) => {
          console.log(err)
        }
      )
    }
  )

}

Binance.prototype.saveCandles = function (coin, asset, interval, limit) {
  this.queryExchange('/api/v1/klines', {
    symbol: asset + coin,
    interval: interval,
    limit: limit
  })
  .then(
    (res)=>{
      if (res.status===200) {
        for (var i=0; i<res.data.length; i++) {
          let data = res.data[i]
          binance_candle.findOrCreate({
            where: {
              symbol: asset + coin,
              openTime: data[0],
              closeTime: data[6]
            },
            defaults: {
              symbol: asset + coin,
              openTime: data[0],
              open: data[1],
              high: data[2],
              low: data[3],
              close: data[4],
              volume: data[5],
              closeTime: data[6],
              quoteAssetVolume: data[7],
              numberOfTrades: data[8],
              takerBuyBaseAssetVolume: data[9],
              takerBuyQuoteAssetVolume: data[10]
            }
          })
          .spread((candle, created) => {
            if (created) {
              console.log('kline', candle.get({plain:true}))           
            }
          })
        }
      }
    },
    (err) => {

    }
  )  
}

module.exports = Binance

