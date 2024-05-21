import express, { urlencoded } from 'express';
import { Sequelize } from 'sequelize';
import router from './routes/router';

// connection to database
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

// entry point
const app = express();
app.use(express.json());
app.use(urlencoded(
  {
    extended: false
  }
));

// routes
router(app);

app.listen(8000, () => {
  console.log("Server started on port 8000");
})

