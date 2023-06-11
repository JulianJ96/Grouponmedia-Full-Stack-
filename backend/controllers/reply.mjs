import { Sequelize } from 'sequelize';
import sequelize from '../config/db.config2.mjs';
import Comment from '../models/comment.mjs';
import Reply from '../models/reply.mjs';
import jwt from 'jsonwebtoken';

export const createReply = async (req, res, next) => {
  try {
    // Authentication middleware
    // Add authentication logic here, if not already implemented

    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authToken.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const { idComment, reply, userId } = req.body;

    if (!idComment || !reply) {
      return res.status(400).json({ message: 'idComment and reply are required fields' });
    }
    
    const actual_date = new Date();
    const date = actual_date.getMonth() + 1 + '-' + actual_date.getDate() + '-' + actual_date.getFullYear();
    console.log('Date:', date);

    // Save Reply in the database
    const commentId = idComment;

    if (!commentId) {
      return res.status(400).json({ message: 'Invalid idComment' });
    }

    const comment = await Comment.findOne({ where: { idComment: commentId } });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const createdReply = await Reply.create({
      idUser: userId,
      idCommentReply: commentId,
      reply: reply,
      myDate: date,
    });

    console.log('Reply:', createdReply);

    res.status(201).json({
      message: 'Reply created successfully',
      reply: createdReply,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Reply was not created. Error: ' + error.message,
    });
  }
};























