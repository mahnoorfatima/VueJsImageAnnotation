var Promise = require("bluebird");
var _ = require('lodash');
const db = require("../models");
const Annotations = db.image_annotation;
const createAnnotations = async (req, res) => {
  try {
      let promises = [];
      let annotations = req.body.annotations;
     let filterarray =  _.filter(annotations, (item) => {
          return !item.imageId;
      });
      let image_id = req.body.id;
      _.forEach(filterarray , (annotation) => {
        promises.push(
            Annotations.create({
                imageId: image_id,
                x: annotation.x,
                y: annotation.y,
                width: annotation.width,
                height: annotation.height,
                label: annotation.label,
                status: annotation.status,
                i_is_archived: 0
            }));
        });
        Promise.all(promises);
  } catch (error) {
    console.log(error);
    return res.send(`${error}`);
  }
};

const deleteAnnotations = async (req, res) => {
  try {
      let annotation = req.body.item;
      Annotations.findOne({
        where: {
          id : annotation.id,
          imageId: annotation.imageId

        }
      }).then((annotation) => {
        annotation.update({
          i_is_archived: 1
        })
      });
  } catch (error) {
    console.log(error);
    return res.send(`${error}`);
  }
};

const updateAnnotations = async (req, res) => {
  try {
    console.log('---------------------update', req.body.item )
      let annotation = req.body.item;
      Annotations.findOne({
        where: {
          id : annotation.id,
          imageId: annotation.imageId

        }
      }).then((item) => {
        item.update({
                x: annotation.x,
                y: annotation.y,
                width: annotation.width,
                height: annotation.height,
                label: annotation.label,
                status: annotation.status,
        })
      });
  } catch (error) {
    console.log(error);
    return res.send(`${error}`);
  }
};
module.exports = {
    createAnnotations,
    deleteAnnotations,
    updateAnnotations
};
