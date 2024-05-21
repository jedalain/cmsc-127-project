import { DataTypes, Sequelize } from 'sequelize';
import { dbConfig } from '../config/dbConfig';
import User from './user';
import FoodItem from './foodItem';
import Review from './review';

const sequelize = dbConfig;

const FoodEstablishment = sequelize.define("foodEstablishments", {
    establishmentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    average_rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    // owner
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: 'userId'
        }
    }
}, {
    timestamps: false,
});

FoodEstablishment.belongsTo(User, { foreignKey: "userId" })
FoodEstablishment.hasMany(FoodItem, { foreignKey: "establishmentId" })
FoodEstablishment.hasMany(Review, { foreignKey: "establishmentId" })

export default FoodEstablishment;