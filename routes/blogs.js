var express = require("express");
var router = express.Router();

const BlogController = require("../controllers/blogs");

router.post("/", BlogController.store);
router.get("/", BlogController.findAll);
router.get("/:id", BlogController.show);
router.put("/:id", BlogController.update);
router.delete("/:id", BlogController.destroy);

module.exports = router;
