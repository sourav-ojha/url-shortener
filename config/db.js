// mongodb connect with mongoose
require("dotenv").config();
const mongoose = require("mongoose");
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const mongoDB = `mongodb+srv://${username}:${password}@cluster0.mbns1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectDB = () => mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = connectDB;
