'user strict'

module.exports = (sequelize, DataTypes) => {
  const ExchangeCuenta = sequelize.define('exchangeCuenta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    apikey: {
      type: DataTypes.STRING,
      required: true
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
      paranoid: true
  });
  return ExchangeCuenta;
};
