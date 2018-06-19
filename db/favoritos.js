'user strict'

module.exports = (sequelize, DataTypes) => {
    const Favoritos = sequelize.define('favoritos', {
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
    return Favoritos;
};
