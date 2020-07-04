const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const annotationsController = require("../controllers/annotation");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.get("/", uploadController.getFiles);
  router.post("/upload", upload.single('file'), uploadController.uploadFiles);
  router.post("/save-annotations",  annotationsController.createAnnotations);
  router.post("/delete-annotation",  annotationsController.deleteAnnotations);
  router.post("/update-annotation",  annotationsController.updateAnnotations);

  return app.use("/", router);
};

module.exports = routes;
