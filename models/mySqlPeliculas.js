const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Peliculas = bdmysql.define('peliculas',
    {
        // Model attributes are defined here
        //'id': {
        //    type: DataTypes.INTEGER,
        //    //allowNull: false,
        //    primaryKey: true
        //},

        'id': {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
    
        'nombre_pelicula': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },

        'genero': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'duracion': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'idioma': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'anioEstreno': {
            type: DataTypes.DATE,
            allowNull: false

            // allowNull defaults to true
        },

    },

    {
        //Maintain table name don't plurilize
        freezeTableName: true,

        // I don't want createdAt
        createdAt: false,

        // I don't want updatedAt
        updatedAt: false
    }
);

module.exports = {
    Peliculas,
}