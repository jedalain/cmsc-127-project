import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/dbConfig';
import FoodEstablishment from './foodEstablishment';
import Review from './review';

const sequelize = dbConfig;

const FoodItem = sequelize.define("foodItems", {
    foodId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // automatically generates id
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
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: 'userId'
        }
    },

    // vendor
    establishmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'foodEstablishments',
            key: 'establishmentId'
        }
    }
}, {
    timestamps: false,
});

FoodItem.belongsTo(FoodEstablishment, { foreignKey: "establishmentId" });
FoodItem.hasMany(Review, { foreignKey: "foodId" })

export default FoodItem;