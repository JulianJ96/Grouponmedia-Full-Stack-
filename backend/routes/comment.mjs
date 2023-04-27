import express from 'express';
import auth from '../middleware/token.mjs';
import multer from '../middleware/multer-config.mjs';
import { getAllComment, getOneComment, createComment } from '../controllers/comment.mjs';

const router = express.Router();

const handleErrors = (err, req, res, next) => {
  console.error(err);
  res.status(401).json({ error: 'Unauthorized' });
};

router.get('/:id/', auth, (req, res, next) => {
  getAllComment(req, res, next).catch((err) => handleErrors(err, req, res, next));
});

router.get('/:id/:idComment', auth, (req, res, next) => {
  getOneComment(req, res, next).catch((err) => handleErrors(err, req, res, next));
});

router.post('/', auth, multer, (req, res, next) => {
  createComment(req, res, next).catch((err) => handleErrors(err, req, res, next));
});

export default router;


