# Binance

Ref.: [Binance official api docs](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md)

## Market

| Method       | endpoint      | VERB  | Descripcion | Params. |
| ------------ |:------------- | :---: | ----------- | ------- |
| depth        | api/v1/depth  | GET   | Order Book  | symbol, limit |
| trades       | api/v1/trades | GET   | Recent trades list | symbol, limit |
| historicalTrades | api/v1/historicalTrades | GET | Get older trades | symbol, limit, fromid |
| aggTrades    | api/v1/aggTrades | GET | Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated. | symbol, fromid, startTime, endTime, limit |
| klines       | api/v1/klines | GET   | Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time. | symbol, interval, limit, startTime, endTime |
| ticker 24hrs     | api/v1/ticker/24hr | GET | 24 hour price change statistics. Careful when accessing this with no symbol. | symbol |
| ticker price     | api/v3/ticker/proce | GET | Latest price for a symbol or symbols | symbol |
| bookTicker       | api/v3/ticker/bookTicker | GET | Best price/qty on the order book for a symbol or symbols. | symbol |

## Account

| Method       | endpoint      | VERB  | Descripcion | Params. |
| ------------ |:------------- | :---: | ----------- | ------- |
| order        | api/v3/order  | POST  | Send in a new order | symbol side, type, timeInForce, quantity, price, newClientOrderId, stopPrice, icebergQty, newOrderRespType, recWindow, timestramp * ver adicionales|
| order test   | api/v3/order/test | POST | Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine. | symbol side, type, timeInForce, quantity, price, newClientOrderId, stopPrice, icebergQty, newOrderRespType, recWindow, timestramp * ver adicionales|
| order        | api/v3/order  | GET    | Check an order's status. | symbol, orderId, origClientOrderId, recWindow, timestamp |
| order cancel | api/v3/irder  | DELETE | Cancel an active order. | symbol, orderId, origClientOrderId, newClientOrderId, recWindow, timestamp |
| openOrders   | api/v3/openOrders | GET | Get all open orders on a symbol. Careful when accessing this with no symbol. | symbo, recWindow, timestamp |
| allOrders    | api/v3/allOrders | GET | Get all account orders; active, canceled, or filled | symbol, orderId, limit, recWindow, timestamp |
| Account Information | api/v3/account | GET | Get current account Information | recWindow, timestamp |
| Account trade list | api/v3/myTrades | GET | Get trades for a specific account and symbol. | symbol, limit, fromId, recWindow, timestamp |

## User data stream

...
