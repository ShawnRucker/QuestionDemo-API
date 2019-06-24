const Config = require('./config/config');
const Sequelize = require('sequelize');
const dbModel = require('./models/model_builder');

// TODO: make this environment agnostic
const database = new dbModel(`postgres://${Config.development.username}:${Config.development.password}@${Config.development.host}:5432/${Config.development.database}`);
database.connectToDB();
database.sequelize.sync().then(
    database.sequelize.query("CREATE EXTENSION fuzzystrmatch").then(console.log("Fuzzy Match Installed")).catch((error)=>console.error("Error Installing Fuzzy Match"))
)