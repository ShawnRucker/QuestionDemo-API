const Sequelize = require('sequelize');
const questionModel = require('./question');
const questionsGroupModel = require('./question_group');

let _sequelize = undefined;
let _online = false;

let _questions = undefined;
let _questionsGroup = undefined;

class model_builder {
    constructor(connectionString) {
        this._sequelize = new Sequelize(connectionString, 
        {
            pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
            }
        });

        // Connect the models
        this._questionsGroup = questionsGroupModel(this._sequelize);
        this._questions = questionModel(this._sequelize);
    }

    connectToDB(){
        this._sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            this.online = true;
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            this.online = false;
        });
    }

    disconnectFromDB(){
        this._sequelize
        .close()
        .then(() => {
            console.log('Connection has been closed successfully.');
            this.online = false;
        })
        .catch(err => {
            console.error('Unable to disconnect from the database:', err);
            this.online = true;
        });
    }

    // Setup gitters for models
    get sequelize() {
        return this._sequelize;
    }

    get questions() {
        return this._questions;
    }

    get questionGroups() {
        return this._questionsGroup;
    }

}

module.exports = model_builder;