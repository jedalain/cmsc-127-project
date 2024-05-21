import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/dbConfig';
import FoodEstablishment from './foodEstablishment';
import Review from './review';

const sequelize = dbConfig;                                                                    

const User = sequelize.define('users', {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4, 
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

User.hasMany(FoodEstablishment, { foreignKey: "userId"})
User.hasMany(Review, { foreignKey: "userId"})

export default User;