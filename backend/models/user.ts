import { STRING } from "sequelize";

const User = sequelize.define("users", {
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
    },
    
    email: {
        type: STRING,
        allowNull: false,
    },
    
    password: {
        type: STRING,
        allowNull: false,
    },
    
    fname: {
        type: STRING,
        allowNull: false,
    },
    
    mname: {
        type: STRING,
        allowNull: true,
    },
    
    lname: {
        type: STRING,
        allowNull: false,
    },

    role: {
        type: STRING,
        allowNull: false,
    }
});

module.exports = User;