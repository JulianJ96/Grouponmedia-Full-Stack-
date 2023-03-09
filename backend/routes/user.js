const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/add', userCtrl.addpostreaduser);
router.get('/user/:id', userCtrl.getuser);
router.delete('/deleteuser/:id', userCtrl.deleteuser);


module.exports = router; 