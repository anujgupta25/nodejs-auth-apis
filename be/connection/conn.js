const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/user-app";

const conn = mongoose
  .connect(mongoUri)
  .then((res) => console.log("mongo connection established ..."))
  .catch((err) => {console.log(error); process.exit(1)});


  module.exports = conn