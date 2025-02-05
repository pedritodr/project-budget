const Comentario = require('../models/comentario');
const User = require('../models/user');

const comentarioController = {  
    async create(req, res){
        
    },
    
    async getAll(req, res) {
        try {
            const comentarios = await Comentario.findAll({
                include: {
                    model: User,
                    attributes: ['name'],
                },
            });
            res.status(201).json({message:"Lista de comentarios",data:comentarios});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    //otros métodos: create,getAll,getById,delete,update...
    
}
module.exports = { comentarioController };