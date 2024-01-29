'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "title is required"
        },
        notEmpty: {
          args: true,
          msg: "title is required"
        }
      }
    },
    synopsis: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    coverUrl: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    isNowShowing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: "isNowShowing is required"
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};