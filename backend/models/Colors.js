const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  colorName: {
    type: String,
    required: true,
  },
  colorHex: {
    type: String,
    require: true,
  },
});

const ColorModel = mongoose.model("colors", ColorSchema);

module.exports = ColorModel;
