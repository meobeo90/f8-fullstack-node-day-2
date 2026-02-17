// const http = require("node:http");
// // const fs = require("node:fs/promises");
// const jsonDB = require("./utils/jsonDB");

// require("./helpers");
// const { truncateTitle, joinArray, mergeObject } = require("./helpers");
// truncateTitle();
// joinArray();
// mergeObject();

// // let uniqId = 0;
// // let db = { tasks: [] };
// // jsonDB.read().then((result) => {
// //   db = result || { tasks: [] };
// //   uniqId = Math.max(0, ...db.tasks.map((t) => t.id));
// // });
// const db = jsonDB.read();
// let uniqId = Math.max(0, ...db.tasks.map((t) => t.id));

// const server = http.createServer((req, res) => {
//   // [GET] /api/tasks
//   if (req.method === "GET" && req.url === "/api/tasks") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(db.tasks));
//     return;
//   }

//   // [GET] /api/tasks/1
//   if (req.method === "GET" && req.url.startsWith("/api/tasks/")) {
//     const taskId = +req.url.split("/").pop();
//     const task = db.tasks.find((task) => task.id === taskId);
//     if (task) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(task));
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("Task not found");
//     }
//     return;
//   }

//   // [DELETE] /api/tasks/1
//   if (req.method === "DELETE" && req.url.startsWith("/api/tasks/")) {
//     const taskId = +req.url.split("/").pop();

//     const taskIndex = db.tasks.findIndex((task) => task.id === taskId);
//     if (taskIndex !== -1) {
//       db.tasks.splice(taskIndex, 1);
//       jsonDB.save(db);
//       res.writeHead(204);
//       res.end();
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("Task not found to delete!");
//     }
//     return;
//   }

//   // [POST]
//   if (req.method === "POST" && req.url === "/api/tasks") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const payload = JSON.parse(body);
//       if (payload.title) {
//         const newTask = {
//           id: ++uniqId,
//           title: payload.title,
//         };
//         db.tasks.push(newTask);
//         jsonDB.save(db);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             data: newTask,
//           }),
//         );
//       } else {
//         res.writeHead(400, { "Content-Type": "text/plain" });
//         res.end("Invalid JSON!");
//       }
//     });
//     return;
//   }
//   // [PUT]
//   if (req.method === "PUT" && req.url.startsWith("/api/tasks/")) {
//     const taskId = +req.url.split("/").pop();

//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const payload = JSON.parse(body);
//       const task = db.tasks.find((task) => task.id === taskId);
//       if (task) {
//         task.title = payload.title ?? task.title;
//         jsonDB.save(db);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(task));
//       } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Task not found to update!");
//       }
//     });
//     return;
//   }

//   // not found
//   res.writeHead(404, { "Content-Type": "text/plain" });
//   res.end("Not Found");
// });
// server.listen(3001, () => {
//   console.log("Server start...");
// });
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const apiRouter = require("./src/routes");

const app = express();
const port = 3000;
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
