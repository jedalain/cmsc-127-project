import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/dbConfig';

const sequelize = dbConfig;

const FoodItem = sequelize.define("foodItems", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    
    avgRating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    // owner
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "users",
            key: 'id'
        }
    },

    // vendor
    foodEstablishmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "foodEstablishments",
            key: 'id'
        }
    }
});

export default FoodItem;