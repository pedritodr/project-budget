const express = require('express');
const infoController = require('../controllers/infoController');

const router = express.Router();

router.get('/info', infoController.get);

module.exports = router;
