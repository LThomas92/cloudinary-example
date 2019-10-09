const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: String,
  image: String,
  imageId: String
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
