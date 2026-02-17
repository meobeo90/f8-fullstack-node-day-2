const { loadDB, saveDB } = require("../../utils/jsonDB");

const RESOURCE = "posts";

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
  const posts = loadDB(RESOURCE);
  let uniqId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
  const newPost = {
    id: uniqId,
    title: data.title,
    content: data.content,
    createAt: new Date().toISOString(),
  };
  posts.push(newPost);
  saveDB(RESOURCE, posts);
  return newPost;
}

// PUT
function update(id, data) {
  const posts = loadDB(RESOURCE);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...data };
  saveDB(RESOURCE, posts);
  return posts[index];
}

// DELETE
function destroy(id) {
  const posts = loadDB(RESOURCE);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  saveDB(RESOURCE, posts);
  return true;
}

module.exports = { getAll, getById, create, update, destroy };
