# Oanda

## OANDA.account
| Method       | endpoint      | VERB  | Descripcion         |
| ------------ |:------------- | :---: | --------------------|
| register     | /v1/accounts  | POST  | Register an account |
| get          | /v1/accounts  | GET   | Get accounts |
| list         | /v1/accounts  | GET   | List all accounts associated with user |
| listSpecific | /v1/accounts/{accountId}   | GET   | List specific account details |

## OANDA.position
| Method      | endpoint      | VERB   | Descripcion |
| ----------- |:--------------|:------:| ----------- |
| list        | /v1/accounts/{accountId}/positions/ | GET    | List all positions |
| listSpecific| /v1/accounts/{accountId}/positions/{instrument} | GET    | List only position for specific instrument |
| close       | /v1/accounts/{accountId}/positions/{instrument} | DELETE | Close all trades in a positions |


## OANDA.transaction
| Method       | endpoint      | VERB  | Descripcion |
| ------------ |:--------------|:-----:| :-----------|
| list         | /v1/accounts/{accountId}/transactions/ | GET |Lists all transactions for a specified account. Accepts optional parameters: maxId, mindId, count, Instrument |
| listSpecific | /v1/accounts/{accountId}/transactions/ | GET | List specific transactions by transaction id |


## OANDA.trade
| Method    | endpoint      | VERB  | Descripcion |
| --------- |:--------------| :----:| ----------- |
| list      | /v1/accounts/{accountId}/trades | GET | List all trade in account. Accepts optional parameters: maxId, count, instrument. |
| listSpecific | /v1/accounts/{accountId}/trades | GET | List specific trades by id. Accepts no optional parameters |
| close     | /v1/accounts/{accountId}/trades | DELETE | Close an existing trade. Accepts no optional parameters. |
| change    | /v1/accounts/{accountId}/trades | PATCH | Modfify and existing trade. Accepts optional parameters: stopLoss, takeProfit, trailingStop |


## OANDA.order
| Method      | endpoint      | VERB  | Descripcion |
| ----------- |:--------------| -----:| ----------- |
| list        | /v1/accounts/{accountId}/orders/ | GET | List all orders in account. Accepts optional parameters: maxId, count, Instrument |
| listSpecific| /v1/accounts/{accountId}/orders/ | GET | List specific orders by id.
| open        | /v1/accounts/{accountId}/orders/ | POST | Create a new order. expiry and price are only required if order type is 'marketIfTouched', 'stop' or 'limit'.  Accepts optional parameters:  expiry (string RFC 3339 format), price, stopLoss, takeProfit, trailingStop, upperBound, lowerBound |
| close       | /v1/accounts/{accountId}/orders/{orderId} | DELETE | Close an existing order. |
| change      | /v1/accounts/{accountId}/orders/{orderId} | PATCH  | Modify an existing order. Accepts optional parameters: units, price, expiry, lowerBound, upperBound, stopLoss, takeProfit, trailingStop. |

## OANDA.rate
| Method     | endpoint        | VERB  | Descripcion |
| ---------- |:--------------- | :----:| ----------- |
| instruments| /v1/instruments |  GET  | List all instruments available. Accepts optional parameters: fields (array of strings) |
| history    | /v1/candles     |  GET  | Return candlesticks for a specific instrument. Accepts optional parameters: granularity,  count, start, end, candleFormat, includeFirst |
| quote      | /v1/prices      |  GET  | Lists the current price for a list of instruments |
