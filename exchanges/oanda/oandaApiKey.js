'user strict'

module.exports = (dbInstance, DataTypes) => {
  const OandaApiKey = dbInstance.define('oanda_api_key', {
    user: {
      type: DataTypes.STRING,
      required: true
    }, 
    key: {
      type: DataTypes.STRING,
      required: true
    },
  }, {
    paranoid: true
  });
  return OandaApiKey;
};
