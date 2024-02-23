module.exports = (sequelize, dataTypes) => {
    let alias = 'Service';
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
        description: {
            type: dataTypes.STRING(400),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
    };

    let config = {
        timestamps: false,
        deletedAt: false
    }
    const Service = sequelize.define(alias, cols, config); 

    
    return Service
};