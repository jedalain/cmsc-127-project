import { DATE, INTEGER, STRING } from "sequelize";

const Review = sequelize.define("reviews", {
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    type: {
        type: STRING,
        allowNull: false,
    },
    
    rating: {
        type: INTEGER,
        allowNull: false,
    },
    
    title: {
        type: STRING,
        allowNull: false,
    },
    
    comment: {
        type: STRING,
        allowNull: true,
    },
    
    dateCreated: {
        type: DATE,
        allowNull: false,
    },
    
    dateModified: {
        type: DATE,
        allowNull: false,
    },

    // owner
    userId: {
        type: STRING,
        allowNull: false,
        references: {
            model: "users",
            key: 'id'
        }
    },

    // food item review
    foodItemId: {
        type: STRING,
        allowNull: false,
        references: {
            model: 'foodItems',
            key: 'id'
        }
    },
    
    // food establishment review
    foodEstablishmentId: {
        type: STRING,
        allowNull: false,
        references: {
            model: 'foodEstablishments',
            key: 'id'
        }
    }
});

module.exports = Review;