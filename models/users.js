// users schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  urls: [
    {
      type: Schema.Types.ObjectId,
      ref: "urls",
    },
  ],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
