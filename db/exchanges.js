'user strict'

module.exports = (sequelize, DataTypes) => {
  const Exchanges = sequelize.define('exchanges', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
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
  return Exchanges;
};
