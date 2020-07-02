'use strict';
module.exports = (sequelize, DataTypes) => {
    var imageAnnotation = sequelize.define('image_annotation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            }, 
        fk_image_id: {
            type: DataTypes.INTEGER,
           allowNull: false
        },
        x: {
          type: DataTypes.STRING,
        },
        y: {
          type: DataTypes.STRING,
        },
        width: {
            type: DataTypes.STRING,
        },
        height: {
            type: DataTypes.STRING,
        }, 
        i_created_by_id: DataTypes.INTEGER,
        i_updated_by_id: DataTypes.INTEGER,
        i_created_at: DataTypes.INTEGER },
        {
            classMethods: {
                createImage: async (data, transaction) => {
                    let currentdate = moment().unix();
                    return this.create({
                        v_image_url: data.imageUrl,
                        type: data.type,
                        name: data.name,
                        file: data.file,
                        i_created_by_id: data.userId,
                        i_created_at: currentdate
                    }, {transaction: transaction});
                },
                getAllImagesMetaData: async (userId, transaction) => {
                    return this.findAll({
                        where: {
                        i_created_by_id: userId
                        }
                    }, {transaction: transaction});
                }
        }
    });
    return imageAnnotation;
  };
