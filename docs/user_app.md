# User App (web)

Es una aplicacion web que permite la interacion de los usuarios con los distintos servicios. Desde la aplicacion se pueden programar alertas, ordenes y obtener informacion de los mercados asi como tambien informacion de las cuentas con las que se opera, historial de operaciones, balance y libro de ordenes.

## UI Elements

* Home
* Indicador de carga
* Formulario de registracion de usuarios
* Encabezado con titulo y botones de adicion y actualizacion
* Contenedor de alertas
* Plantilla de alerta
* Editor de alertas
* Lista de exchanges
* Dialogo para agregar nuevas API keys
* Lista de instrumentos por exchange

Base url: `/api/{version}`

## API Publica

### Accounts
Metodos para la creacion y validacion de cuentas de usuario en la aplicacion.

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| register | POST | Registrar una nueva cuenta | nombre, email, celular, clave |
| login | POST | Iniciar session en la aplicacion | email, clave |
| logout | GET | Finalizar session | - |

## API Privada

Los endpoints de la API privadan solo son accesibles a usuarios que hayn iniciado una session en la aplicacion.

### Exchanges

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| exchanges| GET  | Listar los exchanges disponibles en el sistema | - |
| exchanges/register| POST | Registrar informacion de cuenta de un exchange | `TODO` |

#### Binance
| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| binance/open-orders | GET  | Listar todas las ordenes abiertas | - |

### Alerts

Metodos para la programacion y consulta de alertas.

`instrument: {base:USD, asset:BTC}`

| resource | VERB | Descripcion | Params. |
| -------- | ---- | ----------- | ------- |
| alerts   | POST | Agregar alerta | exchange, instrument, tickInterval, termA, termB, operator |
| alerts   | GET | Listar una o más alertas | exchange, instrument, tickInterval, termA, termB, operator |
