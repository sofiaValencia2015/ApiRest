const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Protagonistas = bdmysql.define('protagonistas', {
    'id': {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    idPelicula: {      
        type: DataTypes.BIGINT,
        allowNull: false
    },

    idHeroe: {      
        type: DataTypes.BIGINT,
        allowNull: false
    },

    'rol': {
        type: DataTypes.STRING,
        allowNull: false
    },

    'escenas_participadas': {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    'papel': {
        type: DataTypes.STRING,
        allowNull: true  
    },

    'pago': {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false,
        defaultValue: 0.00
    }

}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

module.exports = {
    Protagonistas,
};
