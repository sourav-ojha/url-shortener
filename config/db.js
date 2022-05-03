// mongodb connect with mongoose
require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);
const connectDB = () => mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = connectDB;
