if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const router = require('./routes');
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Helo HCK 67" });
});

app.use(router)
app.use(errorHandler)

module.exports = app