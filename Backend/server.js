const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/personDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.redirect("/person");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
