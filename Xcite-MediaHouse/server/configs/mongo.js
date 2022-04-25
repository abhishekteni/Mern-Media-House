const mongoose = require("mongoose");

const connectDB = () => {
  const url = process.env.MONGO_URI;
  try {
    console.log("url", url);
    mongoose.connect(url).then((res) => {
      console.log(`Mongo Is Host on ${res.connection.host}`);
    });
  } catch (error) {
    console.log(`Some thing Went Wrong : ${error}`);
  }
};

module.exports = connectDB;
