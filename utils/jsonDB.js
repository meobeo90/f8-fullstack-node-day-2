const fs = require("node:fs");
const path = require("path");
const dbDir = path.join(__dirname, "..", "db");

function getFilePath(resource) {
  return path.join(dbDir, `${resource}.json`);
}

function loadDB(resource) {
  try {
    const filePath = getFilePath(resource);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(dbDir, { recursive: true });
      fs.writeFileSync(filePath, "[]");
      return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveDB(resoure, data) {
  const filePath = getFilePath(resoure);
  fs.mkdirSync(dbDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { loadDB, saveDB };
