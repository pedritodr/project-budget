const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

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
usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'textosDinamicos',
    timestamps: false,
});

User.hasMany(TextoDinamico, { foreignKey: 'id' });
TextoDinamico.belongsTo(User, { foreignKey: 'id' });

module.exports = TextoDinamico;