const connection = require("./models/db");
require("./models/models_data");


connection
  .sync({
    alter: true,
  })
  .then(() => console.log("Database synced"))
  .then(() => connection.close()); 