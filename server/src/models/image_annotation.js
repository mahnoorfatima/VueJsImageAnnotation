'use strict';
module.exports = (sequelize, DataTypes) => {
    var ImageAnnotation = sequelize.define('image_annotation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            }, 
        imageId: {
            type: DataTypes.INTEGER,
           allowNull: false
        },
        x: {
          type: DataTypes.FLOAT,
        },
        y: {
          type: DataTypes.FLOAT,
        },
        width: {
            type: DataTypes.INTEGER,
        },
        height: {
            type: DataTypes.INTEGER,
        }, 
        label: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        i_is_archived: {
            type: DataTypes.INTEGER,
            allowNull: false},
        i_created_by_id: DataTypes.INTEGER,
        i_updated_by_id: DataTypes.INTEGER,
        i_created_at: DataTypes.INTEGER },
      );
    return ImageAnnotation;
  };
