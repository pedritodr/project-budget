const Comentario = require('../models/comentario');
const User = require('../models/user');

const comentarioController = {  
    async getAll(req, res) {
        try {
            const comentarios = await Comentario.findAll({
                include: {
                    model: User,
                    attributes: ['name'],
                },
            });
            res.status(201).json(comentarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = { comentarioController };