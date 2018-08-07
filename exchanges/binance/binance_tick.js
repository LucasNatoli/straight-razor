'user strict'

module.exports = (dbInstance, DataTypes) => {
  const BinanceTick = dbInstance.define('binance_tick', {
    symbol: {
        type: DataTypes.STRING,
        required: true
    },
    priceChange: {
      type: DataTypes.DECIMAL(18, 8)
    },
    priceChangePercent: {
      type: DataTypes.DECIMAL(18, 8)
    },
    weightedAvgPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    prevClosePrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    lastPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    lastQty:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    bidPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    bidQty:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    askPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    askQty:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    openPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    highPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    lowPrice:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    volume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    quoteVolume:  {
      type: DataTypes.DECIMAL(18, 8)
    },
    openTime: {
      type: DataTypes.BIGINT
    },
    closeTime: {
      type: DataTypes.BIGINT
    },
    firstId: {
      type: DataTypes.BIGINT
    },
    lastId: {
      type: DataTypes.BIGINT
    },
    count: {
      type: DataTypes.BIGINT
    } 
  }, {
    paranoid: true
  });
  return BinanceTick;
};
