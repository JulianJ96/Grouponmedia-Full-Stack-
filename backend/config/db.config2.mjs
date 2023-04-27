import { Sequelize } from 'sequelize';

  
// establish connection to the database using Sequelize
const sequelize = new Sequelize(
  'Groupon-Full-Stack',
  'root',
  'otakuJj9672$', {
    dialect: 'mysql',
    host: 'localhost',
  }
);

// authenticate connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('Unable to synchronize models:', err);
  });

export default sequelize;


