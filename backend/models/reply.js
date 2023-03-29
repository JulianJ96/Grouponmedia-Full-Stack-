const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config2');
const Comment = require('../models/comment');

module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define('Reply', {
      idReply: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      idCommentReply: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reply: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      myDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  
    Reply.associate = function(models){
      Reply.belongsTo(models.Comment, {
        foreignKey: 'idCommentReply',
        targetKey: 'idComment'
      });
    };
  
    return Reply;
};
  