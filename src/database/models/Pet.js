module.exports = (sequelize, dataTypes) => {
    let alias = 'Pet';
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
        specie: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        breed: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        birth: {
            type: dataTypes.DATE,
            allowNull: false
        },
        
    };
    let config = {
        timestamps: false,
        deletedAt: false
    }
    const Pet = sequelize.define(alias, cols, config); 

    
    return Pet
};