const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};
module.exports = connectDB;
