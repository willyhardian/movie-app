const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res, next) {
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
      next(error);
    }
  }

  static async login(req, res, next) {
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
      next(error)
    }
  }
};
