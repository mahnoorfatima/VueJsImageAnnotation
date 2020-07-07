const fs = require("fs");
const {Storage} = require('@google-cloud/storage');
const db = require("../models");
const {format} = require('util');
const Image = db.images;
const storage = new Storage();
const bucket = storage.bucket("webapplication-282411.appspot.com");

const uploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    uploadImageToStorage(req.file)
    .then((data) => {
       Image.create({
      type: req.file.mimetype,
      title: req.body.title,
      description: req.body.description,
      v_image_url: data,
      i_created_by_id: 123456,
      i_is_archived: 0
    });
  }).then((image) => {
    return res.send(`File has been uploaded.`);
  });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

const getFiles = async (req, res) => {
  try {
    Image.findAll({
      attributes: ['id', 'v_image_url', 'title', 'description'],
      order: [
        ['id', 'ASC'],
      ],
      include: [{model:db.image_annotation, 
      attributes: ['id', 'imageId', 'x', 'y', 'height', 'width', 'status', 'label', 'i_is_archived']
    }]
    })
    .then((images) =>{
      return res.send( images);

    })
   
  } catch (error) {
    throw error;
  }
};

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }

    let newFileName = `${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log('----------------', error)
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

module.exports = {
  uploadFiles,
  getFiles
};
