'user strict'

module.exports = (dbInstance, DataTypes) => {
  const BinanceSymbol = dbInstance.define('binance_symbol', {
    symbol: {
        type: DataTypes.STRING,
        required: true
    },
    baseAsset: {
      type: DataTypes.STRING,
      required: true
    },
    baseAssetPrecision: {
        type: DataTypes.INTEGER
    },
    quoteAsset: {
      type: DataTypes.STRING,
      required: true
    },
    quoteAssetPrecision: { //TODO: rename to quotePrecision!!
      type: DataTypes.INTEGER
    }
  }, {
    paranoid: true
  });
  return BinanceSymbol;
};
