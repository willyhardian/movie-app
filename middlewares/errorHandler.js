module.exports = function errorHandler(error, request, response, next) {
  let status = error.status || 500;
  let message = error.message || "Internal server error";

  switch (error.name) {
    case "InvalidInput":
      status = 400;
      message = "email/password is required";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "InvalidUser":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Invalid Token":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found";
      break;
  }
  response.status(status).json({
    message,
  });
};
