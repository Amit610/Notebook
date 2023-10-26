const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/notebook";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
  console.log("Connected to Mongo");
};
module.exports = connectToMongo;
