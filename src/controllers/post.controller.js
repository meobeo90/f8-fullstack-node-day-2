const postModel = require("@/models/post.model");

const getAll = (req, res) => {
  const posts = postModel.getAll();
  res.json(posts);
};

const getOne = (req, res) => {
  const post = postModel.getById(Number(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

const create = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Missing data" });
  }
  const newPost = postModel.create({ title, content });
  res.status(201).json(newPost);
};

const update = (req, res) => {
  const id = +req.params.id;
  const updatePost = postModel.update(id, req.body);
  if (!updatePost) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(updatePost);
};

const destroy = (req, res) => {
  const id = +req.params.id;
  const deletePost = postModel.destroy(id);
  if (!deletePost) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
};
