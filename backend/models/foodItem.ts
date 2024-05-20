import { DOUBLE, STRING } from "sequelize";

const FoodItem = sequelize.define("foodItems", {
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    type: {
        type: STRING,
        allowNull: false,
    },
    
    name: {
        type: STRING,
        allowNull: false,
    },
    
    price: {
        type: DOUBLE,
        allowNull: false,
    },
    
    avgRating: {
        type: DOUBLE,
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

    // vendor
    foodEstablishmentId: {
        type: STRING,
        allowNull: false,
        references: {
            model: "foodEstablishments",
            key: 'id'
        }
    }
});

module.exports = FoodItem;