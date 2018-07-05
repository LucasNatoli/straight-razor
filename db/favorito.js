'user strict'

module.exports = (sequelize, DataTypes) => {
    const Favorito = sequelize.define('favorito', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        coin: {
            type: DataTypes.STRING,
            required: true
        },
        asset: {
            type: DataTypes.STRING,
            required: true
        }
    }, {
        paranoid: true
    });
    return Favorito;
};
