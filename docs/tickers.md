# Tickers

Se consideran tickers a los servicios web que informan el precio actual de un instrumento junto con otra informacion de relevancia.

Dada la necesidad actual de operar en mercados cripto y forex se consideran 2 Tickers inicialmente.

* (criptomarketcap.com) https://coinmarketcap.com/es/api/
* (Forex) pendiente

El servicio de tickers se encarga de consultar y almacenar periodicamente cada Ticker.

* Tiempo entre consulta a los Tickers
* Granularidad/es de la informacion almacenada
* Ranking limit


## Cripto - Coinmarketcap

* Url: https://api.coinmarketcap.com/v2/ticker/
* Método: GET
* Descripción: Este resultado muestra datos de cotización de las criptomonedas por orden de rango. El número máximo de resultados por llamada es 100. Es posible la paginación usando los parámetros start y limit.
* Parámetros opcionales:
  * (int) start - return results starting from the specified number (default is 1)
  * (int) limit - devuelve un máximo de [limit] resultados (el valor predeterminado es 100, el máximo es 100)
  * (string) sort - devuelve resultados ordenados por [sort] . Los posibles valores son id, rank, volume_24h y cpercent_change_24h (el valor predeterminado es rank).
  **Note: It is strongly recommended to use id to sort if paginating through all available results since id is the only sort option guaranteed to return in a consistent order.**
  * (string) structure - especifica la estructura para el campo de datos principal. Los posibles valores son dictionary y array (el valor predeterminado es dictionary).
  * (string) convert - devuelve información sobre precios en términos de otra moneda.
Los valores de moneda fiduciaria válidos son: "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"
Los valores válidos de criptomonedas son: "BTC", "ETH" "XRP", "LTC" y "BCH"

Devuelve:
```javascript
{
    "data": {
        "1": {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "website_slug": "bitcoin",
            "rank": 1,
            "circulating_supply": 17008162.0,
            "total_supply": 17008162.0,
            "max_supply": 21000000.0,
            "quotes": {
                "USD": {
                    "price": 9024.09,
                    "volume_24h": 8765400000.0,
                    "market_cap": 153483184623.0,
                    "percent_change_1h": -2.31,
                    "percent_change_24h": -4.18,
                    "percent_change_7d": -0.47
                }
            },
            "last_updated": 1525137271
        },
        "1027": {
            "id": 1027,
            "name": "Ethereum",
            "symbol": "ETH",
            "website_slug": "ethereum",
            "rank": 2,
            "circulating_supply": 99151888.0,
            "total_supply": 99151888.0,
            "max_supply": null,
            "quotes": {
                "USD": {
                    "price": 642.399,
                    "volume_24h": 2871290000.0,
                    "market_cap": 63695073558.0,
                    "percent_change_1h": -3.75,
                    "percent_change_24h": -7.01,
                    "percent_change_7d": -2.32
                }
            },
            "last_updated": 1525137260
        }
        ...
    },
    "metadata": {
        "timestamp": 1525137187,
        "num_cryptocurrencies": 1602,
        "error": null
    }
]               
````

### Ejemplos

* https://api.coinmarketcap.com/v2/ticker/
* https://api.coinmarketcap.com/v2/ticker/?limit=10
* https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=id
* https://api.coinmarketcap.com/v2/ticker/?start=101&limit=10
* https://api.coinmarketcap.com/v2/ticker/?start=101&limit=10&sort=id
* https://api.coinmarketcap.com/v2/ticker/?start=101&limit=10&sort=id&structure=array
* https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=10
* https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=10

## Forex

Hasta ahora para forex los servicios gratuitos relevados ofrecen un limite de 1000 llamadas api mensuales.
