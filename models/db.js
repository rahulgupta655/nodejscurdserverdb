const mongoose = require("mongoose");

const DB =
  "mongodb+srv://nodejscrud:rahul13051995@cluster0.tdkup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((err) => console.log("Error in DB connection : " + err));

require("./detail.model");
