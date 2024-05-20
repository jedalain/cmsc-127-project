import { DOUBLE, STRING } from "sequelize";

const FoodEstablishment = sequelize.define("foodEstablishments", {
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
    }
});

module.exports = FoodEstablishment;