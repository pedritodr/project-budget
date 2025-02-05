const express = require('express');
const comentarioController = require('../controllers/comentarioController');

const router = express.Router();

router.post('/comentario', comentarioController.create);
router.get('/comentario', comentarioController.getAll);
router.get('/comentario/:id', comentarioController.getById);
router.put('/comentario/:id', comentarioController.update);
router.delete('/comentario/:id', comentarioController.delete); 

module.exports = router;
