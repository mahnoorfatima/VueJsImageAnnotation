const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect, pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},
// dialectOptions: {
//   socketPath: '/cloudsql/webapplication-282411:us-central1:databaseprod'
// },
logging: false,
operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("./image.js")(sequelize, Sequelize);
db.image_annotation =  require("./image_annotation.js")(sequelize, Sequelize);

db.image_annotation.belongsTo(db.images);
db.images.hasMany(db.image_annotation);
module.exports = db;
