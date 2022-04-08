var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth");
const auth = require("../middlewares/authJWT");

router.post("/login", AuthController.login);
router.post("/signup", AuthController.register);

module.exports = router;
