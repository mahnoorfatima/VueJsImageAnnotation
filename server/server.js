const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/route");
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});