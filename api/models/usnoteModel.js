const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usnoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    usnote: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Note", usnoteSchema);
