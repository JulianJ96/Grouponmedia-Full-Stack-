import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'Groupon-Full-Stack',
    'root',
    'otakuJj9672$', {
        dialect: 'mysql',
        host: 'localhost',
    }
);

export default sequelize;
