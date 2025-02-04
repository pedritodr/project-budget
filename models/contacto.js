const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contacto = sequelize.define('Contacto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroTelefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'contactos',
    timestamps: false,
});

module.exports = Contacto;
