import { Sequelize } from 'sequelize';

export const dbConfig = new Sequelize(
    '127project',
    'adminProject',
    '127project',
     {
       host: 'localhost',
       dialect: 'mariadb'
     }
   );