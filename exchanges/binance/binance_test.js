var Binance = require('./binance')

var b = new Binance()
/* 
b.update24hrTicker('BTC', 'BNB')
b.update24hrTicker('BTC', 'LTC') 
b.saveCandles('BTC', 'LTC', '1w', 10)
b.getServerTime()
b.getExchangeInfo()
*/

b.getExchangeInfo()

/* b.queryExchange(
  '/api/v1/ticker/24hr'
)
.then((res) => {
  if (res.status===200) {
    console.log(res.data.length)
  }
})
 */