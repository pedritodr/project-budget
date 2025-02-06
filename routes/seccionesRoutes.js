const express = require('express');
const seccionesController = require('../controllers/seccionesController');

const router = express.Router();

router.post('/secciones', seccionesController.create);
router.get('/secciones', seccionesController.getAll);
router.get('/secciones/:id', seccionesController.getById);
router.put('/secciones/:id', seccionesController.update);
router.delete('/secciones/:id', seccionesController.delete); 

module.exports = router;
