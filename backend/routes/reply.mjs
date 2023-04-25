import express from 'express';
import auth from '../middleware/token.mjs';
import multer from '../middleware/multer-config.mjs';
import { createReply } from '../controllers/reply.mjs';

const router = express.Router();

router.post('/', auth, multer, createReply);

export default router;
