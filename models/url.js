const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // array of objects
    stats: [
      {
        date: {
          type: String,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
