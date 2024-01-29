require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

const { Movie, User } = require("./models");
const { comparePassword } = require("./helpers/bcrypt");
const { signToken } = require("./helpers/jwt");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello HCK 67!");
});

app.post("/users/register", async (req, res) => {
  /* 
    1. ambil data dari req.body
    2. create user
    3. response
  */
  try {
    let { email, password } = req.body;
    let user = await User.create({
      email,
      password,
    });
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error.name);
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/users/login", async (req, res) => {
  /* 
    ? Login itu ngapain ?
    1. ambil data dari req.body
    2. validasi inputan dari user
    3. cari email user di db
    4. kalau ada, cocokin password
    5. kalau aman, kasih access_token dari jwt
  */
  // 1.
  let { email, password } = req.body;
  try {
    // 2.
    if (!email || !password) {
      throw { name: "InvalidInput" };
    }

    // 3.
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !comparePassword(password, user.password)) {
      console.log(user);
      throw { name: "InvalidUser" };
    }

    // Response dengan mengirim access_token yang dibuat dari jwt
    const token = signToken({
      id: user.id,
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.error("error", error);
    if (error.name === "InvalidInput") {
      return res.status(400).json({ meessage: "email/password is required" });
    }
    if (error.name === "InvalidUser") {
      return res.status(401).json({ message: "Invalid email/password" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/movies", async function (request, response) {
  try {
    const movies = await Movie.findAll();
    console.log(movies);
    response.status(200).json(movies);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/movies", async (req, res) => {
  try {
    let movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      let message = error.errors[0].message;
      return res.status(400).json({ message });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/movies/:id", async (req, res) => {
  try {
    let movie = await Movie.findByPk(req.params.id);
    console.log(movie);
    if (!movie) throw { name: "NotFound" };

    await movie.update(req.body);

    res.status(200).json({
      message: `Movie ${req.params.id} has been updated`,
    });
  } catch (error) {
    if (error.name === "NotFound") {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.patch("/movies/:id/show", async (req, res) => {
  try {
    let movie = await Movie.findByPk(req.params.id);
    if (!movie) throw { name: "NotFound" };

    await movie.update({ isNowShowing: req.body.isNowShowing });

    res.status(200).json({
      message: `Movie ${req.params.id} status has been updated to ${req.body.isNowShowing}`,
    });
  } catch (error) {
    if (error.name === "NotFound") {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    let movie = await Movie.findByPk(req.params.id);
    if (!movie) throw { name: "NotFound" };

    await movie.destroy();

    res.status(200).json({
      message: `Movie ${req.params.id} has been removed`,
    });
  } catch (error) {
    if (error.name === "NotFound") {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
