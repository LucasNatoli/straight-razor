# User App (web)

Es una aplicacion web que permite la interacion de los usuarios con los distintos servicios. Desde la aplicacion se pueden programar alertas, ordenes y obtener informacion de los mercados asi como tambien informacion de las cuentas con las que se opera, historial de operaciones, balance y libro de ordenes.

## UI Elements

* Home
* Boton agregar alerta
* Boton agregar exchange
* Boton agregar instrumento
* Formulario de registracion de usuarios
* Editor de alertas
* Listado de Alertas
* Lista de exchanges
* Lista de instrumentos por exchange

## API requests

Base url: `/api/{version}`

### Accounts

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| register | POST | REgistrar una nueva cuenta | nombre, email, celular, clave |

### Exchanges

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| exchanges| GET  | Listar los exchanges disponibles en el sistema | - |
| exchanges/register| POST | Registrar informacion de cuenta de un exchange | `TODO` |

### Alerts

Metodos para la programacion y consulta de alertas

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| alerts   | POST | Agregar alerta | exchange, instrument, tickInterval, termA, termB, operator |
| alerts   | GET | Listar una o más alertas | exchange, instrument, tickInterval, termA, termB, operator |
