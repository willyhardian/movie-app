require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const router = require('./routes');
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello HCK 67!");
});

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.clear();
  console.log(`Example app listening on port ${port}`);
});
