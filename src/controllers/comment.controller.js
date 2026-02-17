const commentModel = require("@/models/comment.model");

const getAll = (req, res) => {
  const comments = commentModel.getAll();
  res.json(comments);
};

const getOne = (req, res) => {
  const comment = commentModel.getById(Number(req.params.id));
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json(comment);
};

const create = (req, res) => {
  const { postId, content } = req.body;
  console.log(req.body);

  if (!postId || !content) {
    return res.status(400).json({ message: "Missing data" });
  }
  const newComment = commentModel.create({ postId, content });
  res.status(201).json(newComment);
};

const update = (req, res) => {
  const id = +req.params.id;
  const updateComment = commentModel.update(id, req.body);
  if (!updateComment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(updateComment);
};

const destroy = (req, res) => {
  const id = +req.params.id;
  const deleteComment = commentModel.destroy(id);
  if (!deleteComment) {
    return res.status(404).json({ message: "Comment not found" });
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
