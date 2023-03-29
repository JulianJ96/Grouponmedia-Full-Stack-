const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'Groupon-Full-Stack',
    'root',
    'otakuJj9672$', {
        dialect: 'mysql',
        host: 'localhost',
    }
);


module.exports = sequelize