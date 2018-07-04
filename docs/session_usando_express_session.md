## Instalacion

Instalar el paquete Express Session

`npm install --save express-session`

Instalar el paquete connect-sqlite3

`npm install --save connect-sqlite3`

## Implementacion

```javascript
const express = require('express')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

var app = express()
app.use(session({
  store: new SQLiteStore,
  secret: 'Secret Key',
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}))
```

Para usar cookies seguras en produccion, pero permitir testing en desarrollo, el siguien es un ejemplo de como habilitar cada setup basandonse en `NODE_ENV`:

```javascript
var app = express()
var sess = {
  secret: 'Secret Key',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
```
