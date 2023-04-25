import express from 'express';
import {signup, login, addpostreaduser, getuser, deleteuser } from '../controllers/user.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/add', addpostreaduser);
router.get('/user/:id', getuser);
router.delete('/deleteuser/:id', deleteuser);

export default router;
