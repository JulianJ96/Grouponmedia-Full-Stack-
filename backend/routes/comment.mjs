import express from 'express';
import auth from '../middleware/token.mjs';
import multer from '../middleware/multer-config.mjs';
import * as commentCtrl from '../controllers/comment.mjs';

const router = express.Router();

router.get('/:id/', auth, commentCtrl.getAllComment);
router.get('/:id/:idComment', auth, commentCtrl.getOneComment);
router.post('/', auth, multer, commentCtrl.createComment);

export default router;


