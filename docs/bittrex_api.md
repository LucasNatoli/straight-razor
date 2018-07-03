# Bittrex

Ref.: [Bittrex Developer's Guide](https://support.bittrex.com/hc/en-us/articles/115003723911-Developer-s-Guide-API#apireference)

Todos los requests utlizan contenido `application/json`.

La url base es: `https://bittrex.com/api/{version}/`.

Todos los request son GET y todos los responses vienen en un objeto response con el resultado en el campo result. Chequear siempre la bandera `success` para verificar si el llamado a la API tuvo exito.

La autenticacion se realiza mediante API key que se genera en el sitio.

## Public

| Method       | endpoint      | VERB  | Descripcion | Params. |
| ------------ |:------------- | :---: | ----------- | ------- |
| getmarkets   | public/getmarkets|GET | Get the open and available trading markets at Bittrex along with other meta data. | - |
| getcurrencies| public/getcurrencies | GET | Get all supported currencies at Bittrex along with other meta data. | - |
| getticker    | public/getticker | GET | Get the current tick values for a market. | market
| getmarketsummaries | public/getmarketsummaries | GET | Get the last 24 hour summary of all active markets. | - |
| getmarketsummary | public/getmarketsummary?market=$market | GET | Get the last 24 hour summary of a specific market. | market |
| getorderbook | public/getorderbook?market=$market&type=$type | GET | Get retrieve the orderbook for a given market. | market, type |
| getmarkethistory | public/getmarkethistory?market=$market | GET | Retrieve the latest trades that have occured for a specific market. | market |

## Market

| Method       | endpoint      | VERB  | Descripcion | Params. |
| ------------ |:------------- | :---: | ----------- | ------- |
|buylimit      | market/buylimit?apikey=$key&market=$market&quantity=$qty&rate=$rate | GET | Place a buy order in a specific market. Use buylimit to place limit orders. Make sure you have the proper permissions set on your API keys for this call to work. | market, qty, rate |
| selllimit    | market/selllimit?apikey=$key&market=$market&quantity=$qty&rate=$rate | GET | Place an sell order in a specific market. Use selllimit to place limit orders. Make sure you have the proper permissions set on your API keys for this call to work. | market, qty, rate |
| cancel       | market/cancel?apikey=$key&uuid=ORDER_UUID | GET | Cancel a buy or sell order. | uuid |
| getopenorders | market/getopenorders?apikey=$key&market=$market | GET | Get all orders that you currently have opened. A specific market can be requested. | market |

## Account

| Method       | endpoint      | VERB  | Descripcion | Params. |
| ------------ |:------------- | :---: | ----------- | ------- |
| getbalances  | account/getbalances?apikey$key | GET | Retrieve all balances from your account. | - |
| getbalance   | account/getbalance?apikey$key&currency=$curr | GET | Retrieve the balance from your account for a specific currency. | currency |
| getdepositaddress | account/getdepositaddress?apikey$key&currency=$curr | GET | Retrieve or generate an address for a specific currency. If one does not exist, the call will fail and return ADDRESS_GENERATING until one is available. | currency |
| withdraw          | account/withdraw?apikey$key&currency=$curr&quantity=$qty&address=EAC_ADDRESS | GET | Used to withdraw funds from your account. Note: please account for txfee. | currency, quantity, address, paymentid |
| getorder          | account/getorder&uuid=$uuid | GET | Retrieve a single order by uuid. | uuid |
| getorderhistory   | account/getorderhistory | GET | Retrieve your order history. | market |
| getwithdrawalhistory  | account/getwithdrawalhistory?currency=$curr | GET | Retrieve your withdrawal history. | currency |
| getdeposithistory     | account/getdeposithistory?currency=$curr | GET | Retrieve your deposit history. | currency |
