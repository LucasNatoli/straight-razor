# Abstract methods

Interfaz abstracta de los endpoints de un exchange.

## Objeto Account

Representa la cuenta de usuario en cada exchage.

## Objeto Market

Contiene los metodos para obtener informacion actual o historica del mercado.

* Obtener los mercados disponibles en un exchange.
* Obtener las monedas disponibles en un mercado.
* Obtener el ultimo tick de un instrumento.
* Obtener iformacion historica de un instrumento.

## Objeto Trades

Contiene los metodos para operar en un mercado.

* Crear una orden.
* Eliminar una orden.
* Obtener ordenes de uno o mas instrumentos.
