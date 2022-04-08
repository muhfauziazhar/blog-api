const { User } = require("../models/");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res) {
    let { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      const token = jwt.sign(
        user.dataValues,
        "authConfig.auth.secret",
        {
          expiresIn: 50400,
        }
      );
      res.status(201).send(token);
    } catch (error) {
      res.sendStatus(403).end();
    }
  }

  static async login(req, res) {
    let { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      console.log("login", user.dataValues);
      if (user) {
        const token = jwt.sign(
          user.dataValues,
          "authConfig.auth.secret",
          {
            expiresIn: 50400,
          }
        );
        // user found
        res.status(200).send(token);
      } else {
        // user not found
        console.log("kesini");
        res.sendStatus(403).end();
      }
    } catch (error) {
      // error
      console.log(error.message);
      res.sendStatus(403).end();
    }
  }
}

module.exports = AuthController;
