var Promise = require("bluebird");
var _ = require('lodash');
const db = require("../models");
const Annotations = db.image_annotation;
const createAnnotations = async (req, res) => {
    console.log('----------------', req.body);
  try {
      let promises = [];
      var annotations = req.body.annotations;
      let image_id = req.body.id;
      _.forEach(annotations , (annotation) => {
        promises.push(
            Annotations.create({
                fk_image_id: image_id,
                x: annotation.x,
                y: annotation.y,
                width: annotation.width,
                height: annotation.height,
                status: annotation.status
            }));
        });
        Promise.all(promises);
  } catch (error) {
    console.log(error);
    return res.send(`${error}`);
  }
};

module.exports = {
    createAnnotations,
};
