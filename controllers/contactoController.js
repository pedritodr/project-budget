const Contacto = require('../models/contacto')

const contactoController = {
    async create(req,res){
        try {
            const { nombre, numeroTelefono,email, mensaje } = req.body;
            const nuevoContacto = Contacto.create({ nombre, numeroTelefono, email, mensaje });

            res.status(201).json({ message: 'Contacto creado', data: nuevoContacto });
        } catch (error) {
            res.status(400).json({ error:error.message });
        }
    },

    async getAll(req,res){
        try {
            const contactos = await Contacto.findAll();
            res.status(200).json({message:'Lista de contactos' , data: contactos});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const contacto = await Contacto.findByPk(id);
            if (contacto) {
                res.status(200).json({message:"Contacto encontrado",data:contacto});
            } else {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nombre, numeroTelefono,email, mensaje } = req.body;
        try {
            if(!id) {
                res.status(400).json({ message: 'Falta el id' });
            }
                
            const contacto = await User.findByPk(id);

            if(!contacto) {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
            await Contacto.update({  nombre, numeroTelefono, email, mensaje }, { where: { id } }); 
            res.json({ message: 'Contacto actualizado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        const contacto = await Contacto.findByPk(id);
        try {
            if(!id) {
                res.status(400).json({ message: 'Falta el id del contacto' });
            }
            if(!contacto) {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
            if(contacto) {
                await Contacto.destroy({ where: { id } });
                res.json({ message: 'Contacto eliminado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
}

module.exports = contactoController;