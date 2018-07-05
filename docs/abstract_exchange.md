# Exchanges

Interfaz abstracta de los endpoints de un exchange.

* Version: 1
* Urlbase: api/{version}/

## Account

Metodos para obtener informacion de la cuenta de usuario en cada exchage.

* Vincular un exchange a la cuenta del usuario
* Obtener informacion de fondos de cada exchange vinculado



## Market

Contiene los metodos para obtener informacion actual o historica del mercado.

* Obtener los mercados disponibles en un exchange.
* Obtener las monedas disponibles en un mercado.
* Obtener el ultimo tick de un instrumento.
* Obtener iformacion historica de un instrumento.

## Trades

Contiene los metodos para operar en un mercado.

* Crear una orden.
* Eliminar una orden.
* Obtener ordenes de uno o mas instrumentos.
