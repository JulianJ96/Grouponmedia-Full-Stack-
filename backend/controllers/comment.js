
const Comment =  require('../models/comment');
const Reply =  require('../models/reply');
const User =  require('../models/user');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const script =  require('../js/script');
const sql = require('mysql');
const sequelize = require('../config/db.config2');
let arrayImages = [];
let arrayVideos = [];

/* FUNCTION TO GET ALL COMMENTS DONE*/
exports.getAllComment = async(req, res, next) => {
  try {
    const comments = await sequelize.query('(SELECT c.idComment,c.idUserComment,c.comment,c.image,c.video,c.myDate,u.email,u.lastname,u.firstname,r.total_replies FROM Comments c LEFT JOIN Users u on c.idUserComment = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idCommentReply FROM Replies r GROUP BY r.idCommentReply) r on r.idCommentReply = c.idComment) ORDER BY c.myDate DESC',
    {
      type: QueryTypes.SELECT
    }); 
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
exports.createComment = async(req, res, next) => {
  const url = req.protocol+'://'+req.get('host')
  req.body = JSON.parse(req.body.body)
      if (req.file) {
      const url = req.protocol+'://'+req.get('host');
      arrayImages += req.body.imageUrl;
      var date = new Date();
      var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
      if (req.file.mimetype == 'video/mp4'){
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          video: req.file.filename,
          date: actual_date});
          res.status(201).send({
            message: comment
          })
        
      }else{
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          image: req.file.filename,
          date: actual_date});
          res.status(201).send({
            message: comment
          })
      }
      }else {
        var date = new Date();
        var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          video: null,
          image: null,
          date: actual_date});
          res.status(201).send({
            message: comment
          })
      }
}

/* FUNCTION TO GET A COMMENT*/
exports.getOneComment =  async (req, res, next) => {
  try {
    const getcomment = await sequelize.query('(SELECT c.idComment,c.idUserComment,c.comment,c.image,c.video,c.myDate,u.email,u.lastname,u.firstname,r.total_replies FROM Comments c LEFT JOIN Users u on c.idUserComment = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idCommentReply FROM Replies r GROUP BY r.idCommentReply) r on r.idCommentReply = c.idComment WHERE c.idComment = $idComment ) ORDER BY c.myDate DESC ',
   {
     bind: { idComment: req.params.idComment },
     type: QueryTypes.SELECT
   });
   const getallreplys = await sequelize.query('SELECT r.idReply,r.idCommentReply,r.idUser,r.reply,r.myDate,u.email,u.lastname,u.firstname FROM Replies r INNER JOIN Users u on r.idUser = u.idUser WHERE r.idCommentReply = $idComment',
   {
     bind: { idComment: req.params.idComment },
     type: QueryTypes.SELECT
   });
   const comments = JSON.parse(JSON.stringify(getcomment))
   const replys = JSON.parse(JSON.stringify(getallreplys))
   var comments2 = JSON.parse(JSON.stringify(getcomment))
   var replys2 = JSON.parse(JSON.stringify(getallreplys))
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
      const data = {comments:comments2,reply:JSON.parse(JSON.stringify(replys2))}
      res.send(data)
    }
  } catch (error) {
    res.status(400).send({message: "Not user found"});
  }
}