'user strict'

module.exports = (sequelize, DataTypes) => {
    const Alerta = sequelize.define('alerta', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            required: true
        },
        coin: {
            type: DataTypes.STRING,
            required: true
        },
        asset: {
            type: DataTypes.STRING,
            required: true
        },
        tickInterval: {
            type: DataTypes.ENUM,
            values: ['oneMin', 'fiveMin', 'oneHour']
        },
        termA: {
            type: DataTypes.STRING,
            required: true
        },
        termB: {
            type: DataTypes.STRING,
            required: true
        },
        operator: {
            type: DataTypes.ENUM,
            values: ['lessOrEqual', 'greaterOrEqual', 'equals']
        }
    }, {
        paranoid: true
    });
    return Alerta;
};
