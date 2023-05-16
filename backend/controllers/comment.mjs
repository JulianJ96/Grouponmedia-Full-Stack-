
import Comment from '../models/comment.mjs';
import Reply from '../models/reply.mjs';
import User from '../models/user.mjs';
import { QueryTypes } from 'sequelize';
import fs from 'fs';
import script from '../js/script.mjs';
import sql from 'mysql';
import sequelize from '../config/db.config2.mjs';

let arrayImages = [];
let arrayVideos = [];

/* FUNCTION TO GET ALL COMMENTS DONE*/
export const getAllComment = async(req, res, next) => {
  try {
    const comments = await sequelize.query('(SELECT c.idComment,c.idUserComment,c.comment,c.image,c.video,c.myDate,u.email,u.lastname,u.firstname,r.total_replies FROM Comments c LEFT JOIN Users u on c.idUserComment = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idCommentReply FROM Replies r GROUP BY r.idCommentReply) r on r.idCommentReply = c.idComment) ORDER BY c.myDate DESC',
  { type: sequelize.QueryTypes.SELECT }
    );

    const usertags = await sequelize.query("SELECT u.tag_posts FROM Users u WHERE u.idUser = $idUser",
    {
     bind: { idUser: req.params.id },
     type: QueryTypes.SELECT
    });
   
    const replys = await sequelize.query('SELECT r.idReply,r.idCommentReply,r.idUser,r.reply,r.myDate,u.email,u.lastname,u.firstname FROM Replies r INNER JOIN Users u on r.idUser = u.idUser',
    {
      type: QueryTypes.SELECT
    });
   var comments2 = JSON.parse(JSON.stringify(comments));
   var replys2 = JSON.parse(JSON.stringify(replys))
   var user_tag2 = JSON.parse(JSON.stringify(usertags[0].tag_posts))
    for ( var i = 0 ; i < comments2.length ; i++){
      for ( var j = 0 ; j < replys2.length ; j++){
        if (comments2[i].idComment == replys2[j].idCommentReply ){
          if (comments2[i].replies == undefined){
          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
        }  
      }
      var tags = JSON.parse(JSON.stringify(user_tag2))
      var post_condition = true;
      
      if (tags != null){
      tags = tags.split(",");
        for ( var k = 0 ; k < tags.length ; k++){
          if (comments2[i].idComment == tags[k]){
          comments2[i].user_tag = true;
          k = tags.length;
          }else{
          comments2[i].user_tag = false;
          }
        }
      }
      
    }
const data = {comments:comments2,reply:replys2,user:tags}
        if(!comments2){
            return res.status(401).send({
                message : 'Comments not found'
            });
        }else{
          res.send(data)
        }
  } catch (error) {
    return res.status(401).send({
      message : error
  });
  }
}

/* FUNCTION TO CREATE A COMMENT DONE*/
export const createComment = async (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  req.body = JSON.parse(req.body.body);
  let arrayImages = '';
  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}`;
    arrayImages += req.body.imageUrl;
    const date = new Date();
    const actual_date = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    if (req.file.mimetype == 'video/mp4') {
      const comment = await Comment.create({
        idUserComment: req.body.userId,
        comment: req.body.comment,
        video: req.file.filename,
        date: actual_date
      });
      res.status(201).send({
        message: comment
      })
    } else {
      const comment = await Comment.create({
        idUserComment: req.body.userId,
        comment: req.body.comment,
        image: req.file.filename,
        date: actual_date
      });
      res.status(201).send({
        message: comment
      })
    }
  } else {
    const date = new Date();
    const actual_date = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    const comment = await Comment.create({
      idUserComment: req.body.userId,
      comment: req.body.comment,
      video: null,
      image: null,
      date: actual_date
    });
    res.status(201).send({
      message: comment
    })
  }
}


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
      // continue with the function code
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
      type: QueryTypes.SELECT
    });
    
    const getallreplys = await sequelize.query(`
    SELECT r.idReply, r.idCommentReply, r.idUser, r.reply, r.myDate, u.email, u.lastname, u.firstname 
    FROM Replies r 
    INNER JOIN Users u ON r.idUser = u.idUser 
    WHERE r.idCommentReply = :idComment
  `, {
    replacements: { idComment: req.params.idComment },
    type: QueryTypes.SELECT
  });

      const comments = JSON.parse(JSON.stringify(getcomment))
      const replys = JSON.parse(JSON.stringify(getallreplys))
      let comments2 = JSON.parse(JSON.stringify(getcomment))
      let replys2 = JSON.parse(JSON.stringify(getallreplys))
      for (let i = 0; i < comments2.length; i++) {
        for (let j = 0; j < replys2.length; j++) {
          if (comments2[i].idComment == replys2[j].idCommentReply) {
            if (comments2[i].replies == undefined) {
              comments2[i].replies = [];
              comments2[i].replies.push(replys2[j]);
            } else {
              comments2[i].replies.push(replys2[j])
            }
          }
        }
        const data = {comments:comments2,reply:JSON.parse(JSON.stringify(replys2))}
        res.send(data)
      }
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
