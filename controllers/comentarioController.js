const Comentario = require('../models/comentario');
const User = require('../models/user');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

const comentarioController = {  
    async create(req, res){
        try {
            const {usuarioId, calificacion, descripcion } = req.body;
            const nuevoComentario = await Comentario.create({
                usuarioId,
                calificacion,
                descripcion
            });
            res.status(201).json({ message: "Comentario creado", data: nuevoComentario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req,res){
        try {
            const comentarios = await sequelize.query(
                `SELECT 
                comentarios.id AS comentario_id,
                comentarios.descripcion,
                comentarios.calificacion,
                users.name AS usuario
                FROM 
                comentarios
                JOIN 
                users ON comentarios."usuarioId" = users.id;`,
                {
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json({message:"Lista de comentarios",data:comentarios})
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getById(req,res){
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByPk(id, {
                include: {
                    model: User,
                    attributes: ['name'],
                },
            });
            if (!comentario) {
                return res.status(404).json({ message: "Comentario no encontrado" });
            }
            res.status(200).json({ message: "Comentario encontrado", data: comentario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req,res){
        try {
            const { id } = req.params;
            const { calificacion, descripcion } = req.body;
            const comentario = await Comentario.findByPk(id);

            if (!comentario) {
                return res.status(404).json({ message: "Comentario no encontrado" });
            }

            await Comentario.update({ calificacion,descripcion}, { where: { id } }); 

            res.status(200).json({ message: "Comentario actualizado", data: comentario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req,res){
        try {
            const { id } = req.params;
            const comentario = await Comentario.findByPk(id);

            if (!comentario) {
                res.status(404).json({ message: "Comentario no encontrado" });
            }

            await Comentario.destroy({ where: { id } });
            res.status(200).json({ message: "Comentario eliminado" });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
}

module.exports = comentarioController;