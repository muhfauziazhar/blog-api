var express = require("express");
var router = express.Router();

const BlogController = require("../controllers/blogs");
const auth = require("../middlewares/authJWT");

router.post("/", BlogController.store);
router.get("/", BlogController.findAll);
router.get("/:id", BlogController.show);
router.put("/:id", BlogController.update);
router.delete("/:id", [auth], BlogController.destroy);

module.exports = router;
