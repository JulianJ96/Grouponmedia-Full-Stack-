import express from 'express';
import userCtrl from '../controllers/user.mjs';

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/add', userCtrl.addpostreaduser);
router.get('/user/:id', userCtrl.getuser);
router.delete('/deleteuser/:id', userCtrl.deleteuser);

export default router;
