const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/:id/', auth, commentCtrl.getAllComment);
router.get('/:id/:idComment', auth, commentCtrl.getOneComment);
router.post('/', auth, multer, commentCtrl.createComment);


module.exports = router;