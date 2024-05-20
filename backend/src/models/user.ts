import { DataTypes } from 'sequelize';
import sequelize from '../server';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Additional model options
});

export default User;