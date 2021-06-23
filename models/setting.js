const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  { capped: { max: 1 } }
);
module.exports = mongoose.model("Setting", settingSchema);
