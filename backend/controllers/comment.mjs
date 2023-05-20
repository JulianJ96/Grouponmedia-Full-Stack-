
import Comment from '../models/comment.mjs';
import Reply from '../models/reply.mjs';
import User from '../models/user.mjs';
import { QueryTypes } from 'sequelize';
import fs from 'fs';
import script from '../js/script.mjs';
import sql from 'mysql';
import sequelize from '../config/db.config2.mjs';
import jwt from 'jsonwebtoken';

let arrayImages = [];
let arrayVideos = [];

/* FUNCTION TO GET ALL COMMENTS DONE*/
export const getAllComment = async (req, res, next) => {
  try {
    console.log('req.params.idComment:', req.params.idComment);

    const comments = await sequelize.query(
      `SELECT c.idComment, c.idUserComment, c.comment, c.image, c.video, c.myDate, u.email, u.lastname, u.firstname, r.total_replies
      FROM Comments c
      LEFT JOIN Users u ON c.idUserComment = u.idUser
      LEFT JOIN (
        SELECT COUNT(r.idReply) AS total_replies, idCommentReply
        FROM Replies r
        GROUP BY r.idCommentReply
      ) r ON r.idCommentReply = c.idComment
      ORDER BY c.myDate DESC`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const usertags = await sequelize.query(
      `SELECT u.tag_posts
      FROM Users u
      WHERE u.idUser = :idUser`,
      {
        replacements: { idUser: req.params.id },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const replies = await sequelize.query(
      `SELECT r.idReply, r.idCommentReply, r.idUser, r.reply, r.myDate, u.email, u.lastname, u.firstname
      FROM Replies r
      INNER JOIN Users u ON r.idUser = u.idUser`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );

    var comments2 = JSON.parse(JSON.stringify(comments));
    var replies2 = JSON.parse(JSON.stringify(replies));
    var user_tags2 = JSON.parse(JSON.stringify(usertags[0].tag_posts));
    for (var i = 0; i < comments2.length; i++) {
      comments2[i].replies = [];
      for (var j = 0; j < replies2.length; j++) {
        if (comments2[i].idComment === replies2[j].idCommentReply) {
          comments2[i].replies.push(replies2[j]);
        }
      }
      var tags = JSON.parse(JSON.stringify(user_tags2));
      var post_condition = true;

      if (tags != null) {
        tags = tags.split(",");
        comments2[i].user_tag = false;
        for (var k = 0; k < tags.length; k++) {
          if (comments2[i].idComment === tags[k]) {
            comments2[i].user_tag = true;
            break;
          }
        }
      }
    }
    const data = { comments: comments2, reply: replies2, user: user_tags2 };
    if (!comments2) {
      return res.status(401).send({
        message: 'Comments not found'
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    return res.status(401).send({
      message: error
    });
  }
};



// FUNCTION TO CREATE A COMMENT!
export const createComment = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
      console.log('Unauthorized - Missing or invalid authorization header');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the Authorization header
    const token = authToken.split(' ')[1];

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('Decoded Token:', decodedToken);

    // Access the authenticated user's information
    const userId = decodedToken.userId;
    console.log('Authenticated User ID:', userId);

    const url = `${req.protocol}://${req.get('host')}`;
    req.body = JSON.parse(req.body.body);
    let arrayImages = '';

    if (req.file) {
      const actual_date = new Date().toISOString();
      const commentData = {
        idUserComment: userId,
        comment: req.body.comment,
        video: null,
        image: null,
        date: actual_date
      };

      if (req.file.mimetype == 'video/mp4') {
        commentData.video = req.file.filename;
      } else {
        commentData.image = req.file.filename;
      }

      const comment = await Comment.create(commentData);

      res.status(201).json({ message: comment });
    } else {
      const actual_date = new Date().toISOString();
      const commentData = {
        idUserComment: userId,
        comment: req.body.comment,
        video: null,
        image: null,
        date: actual_date
      };

      const comment = await Comment.create(commentData);

      res.status(201).json({ message: comment });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getOneComment = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw 'Authorization header missing';
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      const getComment = await sequelize.query(`
        SELECT c.idComment, c.idUserComment, c.comment, c.image, c.video, c.myDate, u.email, u.lastname, u.firstname, r.total_replies
        FROM Comments c
        LEFT JOIN Users u ON c.idUserComment = u.idUser
        LEFT JOIN (
          SELECT COUNT(r.idReply) AS total_replies, idCommentReply
          FROM Replies r
          GROUP BY r.idCommentReply
        ) r ON r.idCommentReply = c.idComment
        WHERE c.idComment = :idComment
        ORDER BY c.myDate DESC
      `, {
        replacements: { idComment: req.params.idComment },
        type: sequelize.QueryTypes.SELECT
      });

      const getallreplys = await sequelize.query(`
      SELECT r.idReply, r.idCommentReply, r.idUser, r.reply, r.myDate, u.email, u.lastname, u.firstname
      FROM Replies r
      INNER JOIN Users u ON r.idUser = u.idUser
      WHERE r.idCommentReply = :idComment
    `, {
      replacements: { idComment: req.params.idComment },
      type: sequelize.QueryTypes.SELECT,
      include: [Comment, User] // Include the Comment and User models to fetch their associated data
    });
    

      const comments = JSON.parse(JSON.stringify(getComment));
      const replies = JSON.parse(JSON.stringify(getallreplys));
      let comments2 = JSON.parse(JSON.stringify(getComment));
      let replies2 = JSON.parse(JSON.stringify(getallreplys));
      for (let i = 0; i < comments2.length; i++) {
        for (let j = 0; j < replies2.length; j++) {
          if (comments2[i].idComment == replies2[j].idCommentReply) {
            if (comments2[i].replies == undefined) {
              comments2[i].replies = [];
              comments2[i].replies.push(replies2[j]);
            } else {
              comments2[i].replies.push(replies2[j]);
            }
          }
        }
      }
      
      const data = { comments: comments2, reply: replies2 };
      res.send(data);
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

