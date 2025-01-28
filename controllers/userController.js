const User = require('../models/user');

const userController = {
    async create(req, res) {
        try {
            const { name, email, age } = req.body;
            const user = await User.create({ name, email, age });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Otros métodos: getById, update, delete...
};

module.exports = userController;
