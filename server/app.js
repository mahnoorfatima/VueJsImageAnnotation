'use strict';
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

// db.sequelize.sync({ force: true }).then((async) => {
//   createImageData();
//   //console.log("Drop and re-sync db.");
// });

const createImageData = async () => {
  db.images.bulkCreate([
    {
      "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593880789347",
      "type": "image/jpeg",
      "title": "Sed porttitor lectus",
      "description": "Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue.",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345
  },
  {        "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882150050",
          "type": "image/jpeg",
          "title": "Lorem ipsum",
          "description": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos.",
          "i_created_by_id": 12345,
          "i_updated_by_id": 12345
      },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882266104",
      "type": "image/jpeg",
      "title": "Praesentium Voluptatum",
      "description": "Dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserun",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345

  },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882297872",
      "type": "image/jpeg",
      "title": "Voluptatum Praesentium",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, elit vitae facilisis eleifend, ipsum elit lobortis eros,",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345
  },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882337996",
      "type": "image/jpeg",
      "title": "Ut enim ad minima",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, elit vitae facilisis eleifend, ipsum elit lobortis eros,",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345
  },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882388403",
      "type": "image/jpeg",
      "title": "Lorem ipsum",
      "description": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid.",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345
  },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882457762",
      "type": "image/jpeg",
      "title": "Pellentesque laoreet",
      "description": "Dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserun",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345
  },
  {
       "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593882663725",
      "type": "image/jpeg",
      "title": "Suspendisse eleifend",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, elit vitae facilisis eleifend, ipsum elit lobortis eros,",
      "i_created_by_id": 12345,
      "i_updated_by_id": 12345

  },
  {
    "v_image_url": "https://storage.googleapis.com/rich-involution-240817.appspot.com/1593880789347",
    "type": "image/jpeg",
    "title": "Sed porttitor lectus",
    "description": "Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue.",
    "i_created_by_id": 12345,
    "i_updated_by_id": 12345
},
  ]);
};


app.get('/', (req, res) => {
  res.status(200).send('Hello, World');
});

// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
