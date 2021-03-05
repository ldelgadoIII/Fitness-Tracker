const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

const db = require("./models");

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// loggin middleware
app.use(logger("dev"));

// post request middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// static folder
app.use(express.static("public"));

// routes


app.listen(PORT, () => {
    console.log(`You're running on port ${PORT}`);
})