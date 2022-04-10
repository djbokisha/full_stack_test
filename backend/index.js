const expresss = require("express");
const app = expresss();
const mongoose = require("mongoose");
const ColorModel = require("./models/Colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const db = process.env.DATABASE;
const cors = require("cors");

app.use(expresss.json());
app.use(cors());

mongoose.connect(db);
app.get("/getColors", (req, res) => {
  ColorModel.find({}, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});

app.post("/createColor", async (req, res) => {
  const color = req.body;
  const newColor = new ColorModel(color);
  await newColor.save();
  console.log("New color created");
  res.json(color);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await ColorModel.findByIdAndRemove(id).exec();
  res.send("Color deleted successfully.");
});

app.listen(port, () => {
  console.log("Server started.");
});
