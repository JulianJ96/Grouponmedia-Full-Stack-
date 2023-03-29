const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config2');

const Comment = sequelize.define('Comment', {
  idComment: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  idUserComment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  myDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

Comment.associate = function(models){
  Comment.belongsTo(models.User, {
    foreignKey: 'idUserComment',
    targetKey: 'idUser'
  });
  Comment.hasMany(models.Reply, {
    foreignKey: 'idCommentReply',
    sourceKey: 'idComment'
  });
};

module.exports = Comment;

