const env = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    env.DBNAME,
    env.DBUSER,
    env.DBPASSWORD,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        define: {
            underscored: true
        },
        logging: false
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.cuenta = require('./cuenta')(sequelize, Sequelize)
db.exchange = require('./exchange')(sequelize, Sequelize)
db.alerta = require('./alerta')(sequelize, Sequelize)
db.exchangeCuenta = require('./exchange_cuenta')(sequelize, Sequelize)

db.alerta.belongsTo(db.cuenta)
db.cuenta.hasMany(db.alerta)

db.alerta.belongsTo(db.exchange);
db.exchange.hasMany(db.alerta);

db.exchangeCuenta.belongsTo(db.exchange)
db.exchangeCuenta.belongsTo(db.cuenta)
db.exchange.hasMany(db.exchangeCuenta)
db.cuenta.hasMany(db.exchangeCuenta)

//db.favorito = require('./favorito')(sequelize, Sequelize);
//
// db.favorito.belongsTo(db.cuenta);
// db.cuenta.hasMany(db.favorito);

// db.favorito.belongsTo(db.exchange);
// db.exchange.hasMany(db.favorito);

module.exports = db;
