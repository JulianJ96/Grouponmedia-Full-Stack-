import Comment from '../models/comment.mjs';
import Reply from '../models/reply.mjs';
import jwt from 'jsonwebtoken';

export const createReply = async (req, res, next) => {
  try {
    const { reply, userId } = req.body;

    if (!reply) {
      console.log('reply:', reply);
      return res.status(400).json({ message: 'reply is a required field' });
    }

    const actual_date = new Date();
    const date = `${actual_date.getMonth() + 1}-${actual_date.getDate()}-${actual_date.getFullYear()}`;
    console.log('Date:', date);

    // Save Reply in the database
    const commentId = req.params.idComment; // Assuming the comment ID is passed as a route parameter

    if (!commentId) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await Comment.findOne({ where: { idComment: commentId } });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Define and use the jwt variable
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Access the userId from the decoded token
    const decodedUserId = decodedToken.userId;

    const createdReply = await Reply.create({
      idUser: decodedUserId,
      idCommentReply: commentId,
      reply,
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


































