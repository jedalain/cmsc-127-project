import { DataTypes } from 'sequelize';
import sequelize from '../server';

const FoodEstablishment = sequelize.define("foodEstablishments", {
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
    }
});

export default FoodEstablishment;