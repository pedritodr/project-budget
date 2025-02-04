const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TextoDinamico = sequelize.define('TextoDinamico', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    seccion: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
}, {
    tableName: 'textosDinamicos',
    timestamps: false,
});


module.exports = TextoDinamico;