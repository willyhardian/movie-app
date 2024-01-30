const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    console.log("masuk authorization");
    let movie = await Movie.findByPk(req.params.id);
    if (!movie) throw { name: "NotFound" };

    if (req.user.id !== movie.UserId) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authorization;
