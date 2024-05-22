const express = require('express');
const router = express.Router();
const controller = require('../controller/MainController');

router.get('/', controller.main);
router.get('/circuits', controller.circuits);
router.get('/circuit', controller.circuit);
router.get('/teams', controller.teams);
router.get('/team', controller.team);
router.get('/driver', controller.driver);
router.get('/mypage', controller.mypage);

router.post('/login', controller.userLogin);
router.post('/register', controller.userRegister);
router.get('/user', controller.mypage);
router.post('/logout', controller.userLogout);
module.exports = router;