import sequelize from '../server';
import User from '../models/user';

// sample lang
sequelize.sync().then(() => {
  console.log('User table created successfully!');

  User.create({
    id: "100",
    email: "test127@gmail.com",
    password: "127721Cmsc",
    fname: "Juan",
    mname: null,
    lname: "Dela Cruz",
    role: "Customer"
  }).then(res => {
    console.log(res);
  }).catch((error) => {
    console.error('Failed to create a new user: ', error);
  });

}).catch((error) => {
  console.error('Unable to create table: ', error);
});
