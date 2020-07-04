'use strict';
const db = require("./index");
module.exports = (sequelize, DataTypes) => {
    var Image = sequelize.define('images', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            }, 
        v_image_url: {
           type: DataTypes.STRING,
           allowNull: false
        },
        type: {
          type: DataTypes.STRING,
        },
        title: {
          type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
          },
        i_created_by_id: DataTypes.INTEGER,
        i_updated_by_id: DataTypes.INTEGER,
        i_created_at: DataTypes.INTEGER }
      );
    return Image;
  };
