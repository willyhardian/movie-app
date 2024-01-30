const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    console.log("masuk authorization");
    let movie = await Movie.findByPk(req.params.id);
    if (!movie) throw { name: "NotFound" };

    console.log("Ini yang mau ngapus >>", req.user);
    console.log("Ini data yang mau dihapus >>", movie.toJSON());

    if (req.user.id !== movie.UserId) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authorization;
