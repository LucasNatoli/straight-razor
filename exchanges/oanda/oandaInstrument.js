'user strict'

module.exports = (dbInstance, DataTypes) => {
  const OandaInstrument = dbInstance.define('oanda_instrument', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    type: {
        type: DataTypes.STRING,
        required: true
    },
    displayName: {
      type: DataTypes.STRING,
      required: true
    },
    pipLocation: {
        type: DataTypes.INTEGER,
        required: true
    },
    displayPrecision: {
        type: DataTypes.INTEGER,
        required: true
    },
    tradeUnitsPrecision: {
        type: DataTypes.INTEGER,
        required: true
    },
    displayPrecision: {
      type: DataTypes.DECIMAL(18, 2)
    },
    tradeUnitsPrecision: {
      type: DataTypes.DECIMAL(18, 2)
    },
    minimumTrailingStopDistance: {
      type: DataTypes.DECIMAL(18, 2)
    },
    maximumTrailingStopDistance: {
      type: DataTypes.DECIMAL(18, 2)
    },
    minimumTrailingStopDistance: {
      type: DataTypes.DECIMAL(18, 2)
    },
    maximumPositionSize: {
      type: DataTypes.DECIMAL(18, 2)
    },
    maximumOrderUnits: {
      type: DataTypes.DECIMAL(18, 2)
    },
    marginRate: {
      type: DataTypes.DECIMAL(18, 2)
    }
  }, {
    paranoid: true
  });
  return OandaInstrument;
};
