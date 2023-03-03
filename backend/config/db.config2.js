const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Grouponmania',
    'root',
    'otakuJj9672$',{
        dialect: 'mysql',
        host: 'localhost',
        port: '3306'
    }
);


module.exports = sequelize;