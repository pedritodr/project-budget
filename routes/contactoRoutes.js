const express = require('express');
const contactoController = require('../controllers/contactoController');

const router = express.Router();

router.post('/contacto', contactoController.create);
router.get('/contacto', contactoController.getAll);
router.get('/contacto/:id', contactoController.getById);
router.put('/contacto/:id', contactoController.update);
router.delete('/contacto/:id', contactoController.delete); 

module.exports = router;
