const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Comentario = sequelize.define('Comentario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        validate: {
            min:1,
            max:5,
        },
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'comentarios',
    timestamps: false,
});

Usuario.hasMany(Comentario, { foreignKey: 'id' });
Comentario.belongsTo(User, { foreignKey: 'id' });


module.exports = Comentario;