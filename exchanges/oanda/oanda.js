/* 
OANDA REST API
-Username: lucas1974
-Account: 101-004-8369741-001
-Token: 92ff10849f623304cecfe1c3c8b8e0f0-d35827d4572daa94b50fae23e210f89f

development	https://api-fxpractice.oanda.com	
prodcution	https://api-fxtrade.oanda.com	 

All requests with a body require Content-Type: application/json unless specified otherwise.
All responses will have Content-Type: application/json unless specified otherwise.

Rate Limiting
REST API
120 requests per second. Excess requests will receive HTTP 429 error. This restriction is applied against the requesting IP address.

Streaming API
20 active streams. Requests above this threshold will be rejected. This restriction is applied against the requesting IP address.

Accounts:
GET https://api-fxpractice.oanda.com/v3/accounts
content-type: application/json
Authorization: Bearer 92ff10849f623304cecfe1c3c8b8e0f0-d35827d4572daa94b50fae23e210f89f

*/
const apiKey = '92ff10849f623304cecfe1c3c8b8e0f0-d35827d4572daa94b50fae23e210f89f'
const axios = require("axios")

const development_api = "https://api-fxpractice.oanda.com"
const production_api = "https://api-fxtrade.oanda.com"

const Sequelize = require('sequelize');
const localDb = new Sequelize(
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
);
const oandaApiKey = require('./oandaApiKey')(localDb, Sequelize)
const oandaAccount = require('./oandaAccounts')(localDb, Sequelize)
const oandaInstrument = require('./oandaInstrument')(localDb, Sequelize)

oandaApiKey.hasMany(oandaAccount)
oandaAccount.belongsTo(oandaApiKey)

oandaAccount.hasMany(oandaInstrument)
oandaInstrument.belongsTo(oandaAccount)


const queryOandaApi = function (endpoint) {
  return new Promise(
    (resolve, reject) => {
      axios.get(development_api + endpoint, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
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

/* 
queryOandaApi('/v3/instruments/EUR_USD/candles?count=2&price=AM&granularity=D').then(
  (results) => {
    if (results.status === 200) console.log(results.data.candles)   
    if (results.status === 429) console.log('Alerta de saturacion!!!')
  },
  (err) => {
    console.log('getAccounts error: ', err)
  }
) 
*/

const updateAccounts = function (key){
  queryOandaApi('/v3/accounts').then(
    (results) => {
      if (results.status === 200) {

        var l = results.data.accounts.length
        for (var i=0; i < l; i++) {

          var account = { 
            account_id: results.data.accounts[i].id
          }
          oandaAccount
            .findOrCreate({
              where: account,
              defaults: account
            })
            .spread((cuenta, created) =>{
              if (created) {
                console.log('nueva cuenta agregada')
              } else {
                console.log('la cuenta ya existia')
              }
            })          
        }
      }
      if (results.status === 429) console.log('Alerta de saturacion!!!')
    },
    (err) => {
      console.log('updateAccounts error: ', err)
    }
  )
}

const updateAPiKey = function (apiKey) {
  var key = {key: apiKey}
  return new Promise((resolve, reject) => {
    oandaApiKey
    .findOrCreate({
      where: key, 
      defaults: key
    })
    .spread((key, created)=>{
      if (created) {
        console.log('api ket agregada')      
      }else {
        console.log('api ya existente')        
      }
      resolve({
        key: key,
        created: created
      })
    })
    .error((err)=> {
      reject(err)
    })
  })
}

const updateIntruments = function (account_id) {
  queryOandaApi('/v3/accounts/' + account_id + '/instruments')
  .then(
    (results)=> {      
      if (results.status === 200) {
        var instruments = results.data.instruments
        var l = instruments.length
        for (var i=0; i<l; i++) {
          var inst = instruments[i]
          oandaInstrument
          .findOrCreate({
            where: {
              name: instruments[i].name
            },
            defaults: {
              name: inst.name,
              type: inst.type,
              displayName: inst.displayName,
              pipLocation: inst.pipLocation,
              displayPrecision: inst.displayPrecision,
              tradeUnitsPrecision: inst.tradeUnitsPrecision,
              minimumTradeSize: inst.minimumTradeSize,
              maximumTradeSize: inst.maximumTradeSize,
              maximumTrailingStopDistance: inst.maximumTrailingStopDistance,
              minimumTrailingStopDistance: inst.minimumTrailingStopDistance,
              maximumPositionSize: inst.maximumPositionSize,
              maximumOrderUnits: inst.maximumOrderUnits, 
              maginRate: inst.maginRate,
              account_id: account_id
            }
          })
          .spread((instrument, created) => {
              if (created) {
                console.log('created: ',  instrument.name)                
              } else {
                console.log('existed: ', instrument.name)
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
localDb.sync({
  force: false
}).then(()=>{
  //updateAPiKey(apiKey).then(updateAccounts())
  updateIntruments('101-004-8369741-001')
})