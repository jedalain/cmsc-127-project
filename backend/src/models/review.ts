import { DataTypes } from "sequelize";
import { dbConfig } from '../config/dbConfig';
import User from "./user";
import FoodEstablishment from "./foodEstablishment";
import FoodItem from "./foodItem";

const sequelize = dbConfig;

const Review = sequelize.define("reviews", {
    reviewId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // automatically generates id 
    },
    
    // [type --> change to status]
    // created, updated, deleted
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // automatically sets to current date/time
    },
    
    dateModified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // automatically sets to current date/time, should be updated on modification
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

    // food item review
    foodId: {
        type: DataTypes.UUID,
        allowNull: true, // allow null if it's a review for an establishment
        references: {
            model: 'foodItems',
            key: 'foodId'
        }
    },
    
    // food establishment review
    establishmentId: {
        type: DataTypes.UUID,
        allowNull: true, // allow null if it's a review for a food item
        references: {
            model: 'foodEstablishments',
            key: 'establishmentId'
        }
    }
}, {
    validate: {
        eitherFoodItemOrEstablishment() {
            if (!this.foodId && !this.establishmentId) {
                throw new Error('Either foodItemId or foodEstablishmentId must be provided');
            }
            if (this.foodId && this.establishmentId) {
                throw new Error('Both foodItemId and foodEstablishmentId cannot be provided at the same time');
            }
        }
    },
});

Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(FoodEstablishment, { foreignKey: "establishmentId" });
Review.belongsTo(FoodItem, { foreignKey: "foodId" });

export default Review;