# Straight Razor

## Información General

Es un set de servicios destinados al analisis de distintos valores de diversos instrumentos en distintos exchanges que operan en linea.

## User App (web)
Es una aplicacion web que permite la interacion de los usuarios con los distintos servicios. Desde la aplicacion se pueden programar alertas, ordenes y obtener informacion de los mercados asi como tambien informacion de las cuentas con las que se opera, historial de operaciones, balance y libro de ordenes.

## Servicio de Alertas
Es un evento que permite que el cliente sea notificado cuando se cumple una condicion en el analisis de de un instrumento en un momento del tiempo.

Cuando la condicion se cumple, el sistema escribe la notificacion de la alerta para que pueda ser leida posteriormente.

Las alertas se configuran como expresiones binarias que pueden incluir distintos
valores.

### Condiciones
Se compone de 2 terminos y un operador.

Terminos:

* El valor de alguna propiedad de una vela: `C, H, L, O`
* Un indicador: `BB, EMA, MA, RSI, MACD`. Los indicadores se calculan en funcion
de distintos conjuntos de parametros según el indicador del que se trate.
* Operaciones Aritmeticas: `suma, resta, multiplicacion y division`

Operadores:

```javascript
'lessOrEqual', 'greaterOrEqual', 'equals'
```

## Servicio Watcher

Revisa periodicamente una lista de alertas en los distintos exchanges
La revision incluye la evaluacion de estrategias utilizando datos historicos,
actuales y calculados.

Cada una cantidad de segundos el watcher lee las definiciones de alertas creadas
por el usuario e inicia el analisis de cada una de ellas. Estos analisis
incluirán generalmente la consulta de informacion a un exchange, el calculo de
algún indicador o valor y la evaluacion de los terminos obtenidos.

## Servicio de Notificaciones

Revisa periodicamente la lista de notificaciones y las dirige a los suscriptores. Una vez dirigida la notificacion la marca como enviada. Si no se puede enviar la notificacion la marca como invalida para su posterior procesamiento.

## Exchanges API docs
* [Oanda](https://github.com/LucasNatoli/straight-razor/blob/master/docs/oanda_api.md)
* [Bittrex](https://github.com/LucasNatoli/straight-razor/blob/master/docs/bittrex_api.md)
* [Binance](https://github.com/LucasNatoli/straight-razor/blob/master/docs/binance_api.md)
* [Abstract](https://github.com/LucasNatoli/straight-razor/blob/master/docs/abstract_exchange.md)

## Detalles técnicos

* El endpoint base es: localhost/apikey
* Todos los endpoints devuelven una objeto JSON con dos propiedades: un flag de
ejecucion `success` y el resultado de la llamada `result`.
* Toda la informacion se ordena ascendentemente por fecha. De mas viejo a mas
nuevo.
* Todos los timestamps estant expresados en milisegundos
