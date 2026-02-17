const express = require("express");
const router = express.Router();

const CommentController = require("@/controllers/comment.controller");

// [GET]
router.get("/", CommentController.getAll);

// GET /api/posts/123
router.get("/:id", CommentController.getOne);

// POST
router.post("/", CommentController.create);

// PUT
router.put("/:id", CommentController.update);

// DELETE
router.delete("/:id", CommentController.destroy);

module.exports = router;
