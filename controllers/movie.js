const { Movie } = require("../models");

module.exports = class MovieController {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      next(error)
    }
  }

  static async getPopularMovies(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }
  }
  
  static async getMovie(req, res, next) {
    try {
      const movie = await Movie.findOne(req.params.id);
      if(!movie) throw {name: "NotFound"}
      res.status(200).json(movies);
    } catch (error) {
      next(error)
    }
  }

  static async createMovie(req, res, next) {
    try {
      console.log(req.user, "<<< User yang lagi ngebuat request");

      let movie = await Movie.create({ ...req.body, UserId: req.user.id });
      res.status(201).json(movie);
    } catch (error) {
      next(error)
    }
  }

  static async editMovie(req, res, next) {
    try {
      let movie = await Movie.findByPk(req.params.id);
      console.log(movie);
      if (!movie) throw { name: "NotFound" };

      await movie.update(req.body);

      res.status(200).json({
        message: `Movie ${req.params.id} has been updated`,
      });
    } catch (error) {
      next(error)
    }
  }

  static async updateShow(req, res, next) {
    try {
      let movie = await Movie.findByPk(req.params.id);
      if (!movie) throw { name: "NotFound" };

      await movie.update({ isNowShowing: req.body.isNowShowing });

      res.status(200).json({
        message: `Movie ${req.params.id} status has been updated to ${req.body.isNowShowing}`,
      });
    } catch (error) {
      next(error)
    }
  }

  static async removeMovie(req, res, next) {
    try {
      let movie = await Movie.findByPk(req.params.id);
      if (!movie) throw { name: "NotFound" };

      // await movie.destroy();

      res.status(200).json({
        message: `Movie ${req.params.id} has been removed`,
      });
    } catch (error) {
      next(error)
    }
  }
};
