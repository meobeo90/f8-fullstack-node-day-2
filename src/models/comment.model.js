const { loadDB, saveDB } = require("../../utils/jsonDB");

const RESOURCE = "comments";

// GET
function getAll() {
  return loadDB(RESOURCE);
}

// GET by ID
function getById(id) {
  return loadDB(RESOURCE).find((post) => post.id === id);
}

// POST
function create(data) {
  const comments = loadDB(RESOURCE);
  let uniqId = comments.length ? Math.max(...comments.map((p) => p.id)) + 1 : 1;
  const newComment = {
    id: uniqId,
    postId: data.postId,
    content: data.content,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  saveDB(RESOURCE, comments);
  return newComment;
}

// PUT
function update(id, data) {
  const comments = loadDB(RESOURCE);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index === -1) return null;
  comments[index] = { ...comments[index], ...data };
  saveDB(RESOURCE, comments);
  return comments[index];
}

// DELETE
function destroy(id) {
  const comments = loadDB(RESOURCE);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index === -1) return false;
  comments.splice(index, 1);
  saveDB(RESOURCE, comments);
  return true;
}

module.exports = { getAll, getById, create, update, destroy };
