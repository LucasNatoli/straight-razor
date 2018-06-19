const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'sequelize_tutorial',
    'root',
    'Kalama2018',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        define: {
            underscored: true
        }
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.cuentas = require('./cuentas')(sequelize, Sequelize);
db.exchanges = require('./exchanges')(sequelize, Sequelize);
db.favoritos = require('./favoritos')(sequelize, Sequelize);

db.favoritos.belongsTo(db.cuentas);
db.cuentas.hasMany(db.favoritos);

module.exports = db;
