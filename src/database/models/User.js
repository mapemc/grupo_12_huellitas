module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INT(11).UNSIGNED,
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
        street: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        adress: {
            type: dataTypes.STRING(20),
            allowNull: false
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
            type: dataTypes.INT(11),
            allowNull: true
        },
        category: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        location: {
            type: dataTypes.STRING(255),
            allowNull: false
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    const User = sequelize.define(alias, cols, config); 

    
    return User
};