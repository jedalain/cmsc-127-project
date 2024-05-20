import { DataTypes } from "sequelize";
import sequelize from "../server";

const Review = sequelize.define("reviews", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    dateModified: {
        type: DataTypes.DATE,
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

    // food item review
    foodItemId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'foodItems',
            key: 'id'
        }
    },
    
    // food establishment review
    foodEstablishmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'foodEstablishments',
            key: 'id'
        }
    }
});

export default Review;