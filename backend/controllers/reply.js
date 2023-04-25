const fs = require('fs');
const script = require('../js/script.mjs');
const sql = require('mysql');
const User = require('../models/user.mjs');
const Reply = require('../models/reply');

exports.createReply = async (req, res, next) => {
  try {
    req.body = JSON.parse(req.body.body);
    const actual_date = new Date();
    const date =
      actual_date.getMonth() + 1 + '-' + actual_date.getDate() + '-' + actual_date.getFullYear();
    // Save Reply in the database
    const reply = await Reply.create({
      idUser: req.body.id,
      idCommentReply: req.body.idComment,
      reply: req.body.reply,
      myDate: date,
    });
    res.status(201).send({
      message: reply,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Reply was not created',
    });
  }
};

