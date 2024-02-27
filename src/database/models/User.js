module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        phone: {
            type: dataTypes.BIGINT(20),
            allowNull: true
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        address: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        floor: {
            type: dataTypes.STRING(5),
            allowNull: true
        },
        flat: {
            type: dataTypes.STRING(5),
            allowNull: true
        },
        post_code: {
            type: dataTypes.BIGINT(11),
            allowNull: true
        },
        category: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        location: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        
    };
    let config = {
        timestamps: false,
        deletedAt: false
    }
    
    const User = sequelize.define(alias, cols, config); 

    
    return User
};