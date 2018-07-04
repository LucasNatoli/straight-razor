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
db.cuentas = require('./cuentas')(sequelize, Sequelize);
db.exchanges = require('./exchanges')(sequelize, Sequelize);
//db.favoritos = require('./favoritos')(sequelize, Sequelize);
db.alertas = require('./alertas')(sequelize, Sequelize);
//
// db.favoritos.belongsTo(db.cuentas);
// db.cuentas.hasMany(db.favoritos);

// db.favoritos.belongsTo(db.exchanges);
// db.exchanges.hasMany(db.favoritos);

db.alertas.belongsTo(db.exchanges);
db.exchanges.hasMany(db.alertas);

module.exports = db;
