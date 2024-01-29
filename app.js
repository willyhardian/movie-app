const express = require("express");
const app = express();
const port = 3000;

const { Movie } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello HCK 67!");
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
