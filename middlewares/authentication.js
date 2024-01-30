const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function authentication(req, res, next) {
  let access_token = req.headers.authorization;
  try {
    // 1. memastikan ada access_token didalam req.headers.authorization
    if (!access_token) throw { name: "Invalid Token" };

    // 2. memastikan format token yang dikirim benar
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "Invalid Token" };

    // 3. verify & decode token
    let payload = verifyToken(token);

    // 4. cari user apakah exist di db
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "Invalid Token" };

    // 5. ????
    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error)
  }
};
