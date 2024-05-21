import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    '127project',
    'adminProject',
    '127project',
        {
        host: 'localhost',
        dialect: 'mariadb'
        }
);

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