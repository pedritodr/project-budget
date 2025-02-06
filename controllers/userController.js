const User = require('../models/user');

const userController = {
    async create(req, res) {
        const { name, email, age } = req.body;
        try {
            const userExiste = await User.findOne({where: { email }});
            if(userExiste) {
                res.status(400).json({message:`El email ya está en uso ${email}` });
            }
            const user = await User.create({ name, email, age });
            res.status(201).json({message:"Usuario creado",data:user});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({message:'Lista de usuarios' , data: users});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await User.findByPk(id);
            if (usuario) {
                res.status(200).json({message:"Usuario Encontrado",data:usuario});
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, email, age } = req.body;
        try {
            if(!id) {
                res.status(400).json({ message: 'Falta el id' });
            }
                
            const usuario = await User.findByPk(id);

            if(!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            await User.update({ name, email, age }, { where: { id } }); 
            res.json({ message: 'Usuario actualizado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
    async delete(req, res) {
        const { id } = req.params;
        const usuario = await User.findByPk(id);
        try {
            if(!id) {
                res.status(400).json({ message: 'Falta el id del usuario' });
            }
            if(!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            if(usuario) {
                await User.destroy({ where: { id } });
                res.json({ message: 'Usuario eliminado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = userController;
