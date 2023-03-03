const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Grouponmania',
    'root',
    'otakuJj9672$', {
        dialect: 'mysql',
        host: 'localhost',
    }
);


module.exports = sequelize