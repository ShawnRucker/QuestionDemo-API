const Sequelize = require('sequelize');

let questionGroupModel = function(sequelize) {
    
    // The Model is always needed
    const questionGroups = sequelize.define('questiongroups', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        // options
    });

    return {
        model : function() {    
            return questionGroups;
        }
    }  
}

module.exports = questionGroupModel;