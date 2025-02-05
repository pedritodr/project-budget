const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Seccion = sequelize.define('Secciones', {
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
    tableName: 'Secciones',
    timestamps: false,
});


module.exports = Seccion;