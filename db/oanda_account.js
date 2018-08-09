'user strict'

module.exports = (dbInstance, DataTypes) => {
  const OandaAccount = dbInstance.define('oanda_account', {
    account_id: {
      type: DataTypes.STRING,
      required: true
    }
  }, {
    paranoid: true
  })
  return OandaAccount
}
