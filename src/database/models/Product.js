module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: dataTypes.BIGINT(11),
            allowNull: false
        },
        photo: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        size: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        insale: {
            type: dataTypes.TINYINT(1),
            allowNull: true
        },
        
    };
    let config = {
        timestamps: false,
        deletedAt: false
    }
    
    const Product = sequelize.define(alias, cols, config); 

    
    return Product
};