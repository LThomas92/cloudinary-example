require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const Image = require("./models/imageModel");

//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "lthomas92",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//connect to the database
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

mongoose.set("useCreateIndex", true, "useFindandModify", false);

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

// Initialize CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//ROUTES

app.get("/", (req, res) => {
  Image.find(function(err, images) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(images);
    }
  });
});

app.post("/add", upload.single("image"), (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    if (err) {
      req.json(err.message);
    }
    req.body.image = result.secure_url;
    // add image's public_id to image object
    req.body.imageId = result.public_id;

    Image.create(req.body, function(err, image) {
      if (err) {
        res.json(err.message);
        return res.redirect("/");
      }
    });
  });
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});

module.exports = app;
