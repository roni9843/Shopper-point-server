`node --trace-warnings ...`;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

// ? mongodb connect
mongoose.connect(
  `mongodb+srv://organicUser:${process.env.DB_CONN}@cluster0.tibcl.mongodb.net/shoppers-point`
);

// ? config
const PORT = process.env.PORT || 5000;

// ? schema
const CategorySchema = mongoose.model("Category", { name: String });

const ProductSchema = mongoose.model("Product", {
  name: String,
  category: String,
  isProductOffer: Boolean,
  price: String,
  offer: String,
  description: String,
  isSize: Boolean,
  size: {
    type: [String],
  },
  imageLink: {
    type: [String],
  },
});

// ? middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ? route

// ^ post categories
app.post("/shoppersPointCategoryPost", function (req, res) {
  const newData = req.body.name;

  const CategorySave = new CategorySchema({ name: newData });
  CategorySave.save().then(() => {
    console.log("shoppersPointCategoryPost");

    res.send({
      message: "Successful",
    });
  });
});

// ^ find all categories
app.get("/shoppersPointCategoryFindAll", function (req, res) {
  CategorySchema.find().then((result) => {
    console.log("shoppersPointCategoryFindAll", result);
    res.send({
      message: "Successful",
      result,
    });
  });
});

// ^ post product
app.post("/shoppersPointPostProduct", function (req, res) {
  const {
    name,
    category,
    isProductOffer,
    price,
    offer,
    isSize,
    size,
    imageLink,
    description,
  } = req.body;

  console.log(req.body);

  const ProductSave = new ProductSchema({
    name: name,
    category: category,
    isProductOffer: isProductOffer,
    price: price,
    offer: offer,
    isSize: isSize,
    size: size,
    imageLink: imageLink,
    description: description,
  });
  ProductSave.save().then(() => {
    console.log("shoppersPointPostProduct");
    res.send({
      message: "Successful",
    });
  });
});

// ^ find all product
app.get("/shoppersPointFindAllProduct", function (req, res) {
  ProductSchema.find().then((result) => {
    console.log("shoppersPointFindAllProduct", result);
    res.send({
      message: "Successful",
      result,
    });
  });
});

// ^ product find all by Id
app.get("/shoppersPointProductFindId", function (req, res) {
  const pId = req.query.id;

  ProductSchema.findById(pId).then((result) => {
    console.log("shoppersPointProductFindId", result);

    res.send({
      message: "Successful",
      result,
    });
  });
});

app.listen(PORT, function () {
  console.log(`Example app listening at 5000`);
});
