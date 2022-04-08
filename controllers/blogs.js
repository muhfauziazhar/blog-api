const { Blog } = require("../models/");
const { Op } = require("sequelize");

class BlogController {
  // POST /blogs
  static async store(req, res) {
    let { title, description, category, imageUrl, date } = req.body;
    // let { user_id } = req.session; (need login first to get this data)
    await Blog.create({
      title,
      description,
      category,
      imageUrl,
      date,
    });
    res.status(201).json({ status: "Success create a new blog" });
  }
  // GET /blogs
  static async findAll(req, res) {
    let category = req.query.category;
    // to make filter by category
    if (category) {
      let blogByCategory = await Blog.findAll({
        where: { category: category },
      });
      return res.status(200).json({
        status: "Success get data by category",
        payload: blogByCategory,
      });
    }
    let q = req.query.q;
    if (q) {
      let blogByTitle = await Blog.findAll({
        where: { title: { [Op.like]: `%${q}%` } },
      });
      return res.status(200).json({
        status: "Success get data by title",
        payload: blogByTitle,
      });
    }
    let blogs = await Blog.findAll();
    res
      .status(200)
      .json({ status: "Success get all Blogs", payload: blogs });
  }
  // GET /blogs/:id
  static async show(req, res) {
    let id = req.params.id;
    let blog = await Blog.findByPk(id);
    if (blog === null) {
      return res.status(404).json({
        status: "error",
        message: "tidak dapat menemukan blog dengan id tersebut",
      });
    }
    res
      .status(200)
      .json({ status: "Success get blog by id", payload: blog });
  }
  // PUT /blogs/:id
  static async update(req, res) {
    let id = req.params.id;
    let { title, description, category, date } = req.body;
    let blog = await Blog.findByPk(id);
    if (blog === null) {
      res.status(404).json({
        status: "error",
        message: "blog dengan id tersebut tidak ditemukan",
      });
    }
    await Blog.update(
      {
        title,
        description,
        category,
        date,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).json({
      status: "success",
      message: "blog has beeen updated",
    });
  }
  // DELETE /blogs/:id
  static async destroy(req, res) {
    let id = req.params.id;
    let blog = await Blog.findByPk(id);
    if (blog === null) {
      res.status(404).json({
        status: "error",
        message: "data dengan id tersebut tidak ditemukan",
      });
    }
    await Blog.destroy({
      where: { id: id },
    });
    res.status(200).json({
      status: "success",
      message: "blog has beeen deleted",
    });
  }
}

module.exports = BlogController;
