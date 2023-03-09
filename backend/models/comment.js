  const Sequelize = require('sequelize')
  // Import sequelize object,
  // Database connection pool managed by Seque4AtDDQlize.
  const sequelize = require('../config/db.config2');
  const User =  require('../models/user');
  // Define method takes two arguments
  // 1st - name of table
  // 2nd - columns inside the table
  const Comment = sequelize.define('Comment', {
      // Column-1, Comment_id is an object with
      // properties like type, keys,
      // validation of column.
      idComment:{/*Sequelize module has INTEGER Data_Type.*/ type:Sequelize.INTEGER,
          /*To increment Comment_id automatically.*/autoIncrement:true,
          /* Comment_id can not be null.*/allowNull:false,
          /* For uniquely identify Comment.*/primaryKey:true
      },
      idUserComment: {
        type: Sequelize.INTEGER,
        /* user_id can not be null.*/allowNull:false,
    },
      // Column-2, lastname
      comment: { type: Sequelize.STRING, allowNull:false },
      // Column-3, firstname
      image: { type: Sequelize.STRING, allowNull:true },
      // Column-4, email
      video: { type: Sequelize.STRING, allowNull:true },
      // Column-7 Createion date, default values for
      // dates => current time
      myDate: { type: Sequelize.DATE,
              defaultValue: Sequelize.NOW },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
  })
  




  // Exporting User, using this constant
  // we can perform CRUD operations on
  // 'Comment' table.
  module.exports = Comment