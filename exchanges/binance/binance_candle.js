'user strict'

module.exports = (dbInstance, DataTypes) => {
  const BinanceCandle = dbInstance.define('binance_candle', {
    symbol: {
        type: DataTypes.STRING,
        required: true
    },
    open: {
      type: DataTypes.DECIMAL(18, 8)
    },
    high: {
      type: DataTypes.DECIMAL(18, 8)
    },
    low:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    close:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    volume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    quoteAssetVolume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    takerBuyBaseAssetVolume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    takerBuyQuoteAssetVolume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    openTime: {
      type: DataTypes.BIGINT
    },
    closeTime: {
      type: DataTypes.BIGINT
    },
    numberOfTrades: {
      type: DataTypes.BIGINT
    } 
  }, {
    paranoid: true
  });
  return BinanceCandle;
};