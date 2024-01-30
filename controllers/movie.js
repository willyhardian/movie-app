const { Movie } = require("../models");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

module.exports = class MovieController {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getPopularMovies(req, res, next) {
    try {
      let { data } = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        headers: {
          Authorization:
            "Bearer " + process.env.tmdb_access_token,
        },
      });
      let result = data.results.map((el) => {
        return {
          title: el.title,
          synopsis: el.overview,
          coverUrl: "https://image.tmdb.org/t/p/original" + el.poster_path,
          id: `tmdb-${el.id}`,
        };
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getMovie(req, res, next) {
    try {
      const movie = await Movie.findOne({ where: { id: req.params.id } });
      if (!movie) throw { name: "NotFound" };
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    try {
      console.log(req.user, "<<< User yang lagi ngebuat request");

      let movie = await Movie.create({ ...req.body, UserId: req.user.id });
      res.status(201).json(movie);
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  static async updateImgUrl(req, res, next) {
    try {
      let movie = await Movie.findByPk(req.params.id);

      const b64File = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64File}`;
      let result = await cloudinary.uploader.upload(dataURI);
      
      await movie.update({coverUrl: result.url});
      console.log(movie);
      
      res.status(200).json({
        message: `Movie ${req.params.id} img has been updated`,
      });
    } catch (error) {
      next(error);
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
      next(error);
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
      next(error);
    }
  }
};
