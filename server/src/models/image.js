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
        name: {
          type: DataTypes.STRING,
        },
        file: {
          type: DataTypes.BLOB("long"),
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


    return Image;
  };
