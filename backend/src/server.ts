import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
 '127project',
 'adminProject',
 '127project',
  {
    host: 'localhost',
    dialect: 'mariadb'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

export default sequelize; 