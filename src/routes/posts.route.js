const express = require("express");
const router = express.Router();

const PostController = require("@/controllers/post.controller");

// [GET]
router.get("/", PostController.getAll);

// GET /api/posts/123
router.get("/:id", PostController.getOne);

// POST
router.post("/", PostController.create);

// PUT
router.put("/:id", PostController.update);

// DELETE
router.delete("/:id", PostController.destroy);

module.exports = router;
