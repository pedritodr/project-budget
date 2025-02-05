const Seccion = require('../models/secciones');

const seccionesController = {
    async create(req, res) {
        const { seccion, contenido } = req.body;
        try {
            const seccionExiste = await Seccion.findOne({where: { seccion }});
            if(seccionExiste) {
                res.status(400).json({message:`La sección ya existe ${seccion}` });
            }
            const nuevaSeccion = await Seccion.create({ nuevaSeccion, contenido });
            res.status(201).json({message:"Sección creada",data:nuevaSeccion});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const secciones = await Seccion.findAll();
            res.status(200).json({message:'Lista de secciones' , data: secciones});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const seccion = await Seccion.findByPk(id);
            if (seccion) {
                res.status(200).json({message:"Sección Encontrada",data:seccion});
            } else {
                res.status(404).json({ message: 'Sección no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req,res){
        const { id } = req.params;
        const { seccion, contenido } = req.body;
        try {
            if(!id) {
                res.status(400).json({ message: 'Falta el id' });
            }
                
            const seccionId = await Seccion.findByPk(id);

            if(!seccionId) {
                res.status(404).json({ message: 'Sección no encontrada' });
            }
            await Seccion.update({ seccion, contenido }, { where: { id } }); 
            res.json({ message: 'Sección actualizada' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res){
        const { id } = req.params;
        const seccionId = await Seccion.findByPk(id);
        try {
            if(!seccionId) {
                res.status(404).json({ message: 'Sección no encontrada' });
            }else {
                await Seccion.destroy({ where: { id } });
                res.json({ message: 'Sección eliminada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
}

module.exports = seccionesController;