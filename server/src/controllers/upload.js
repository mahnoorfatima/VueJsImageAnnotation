const fs = require("fs");

const db = require("../models");
const Annotations = db.annotations;
const Image = db.images;
const uploadFiles = async (req, res) => {
  try {
    console.log(req);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      v_image_url: "http://localhost:8081/" + req.file.filename,
      i_created_by_id: 123456,
      file: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      )
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

const getFiles = async (req, res) => {
  try {
    console.log(req);
    Image.findAll({
      attributes: ['id', 'v_image_url'],
      include: ["annotations"] 
    })
    .then((images) =>{
      return res.send( images);

    })
   
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
  getFiles
};
