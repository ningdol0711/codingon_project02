const express = require('express');
const router = express.Router();
const controller = require('../controller/MainController');

router.get('/', controller.main);
router.get('/circuits', controller.circuits);
router.get('/circuit', controller.circuit)

module.exports = router;