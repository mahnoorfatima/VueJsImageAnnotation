const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("./image.js")(sequelize, Sequelize);
db.image_annotation =  require("./image_annotation.js")(sequelize, Sequelize);

db.images.hasMany(db.image_annotation, { as: "annotations" }, {
  foreignKey: 'id'
});
db.image_annotation.belongsTo(db.images, {
  foreignKey: "id"});
module.exports = db;
