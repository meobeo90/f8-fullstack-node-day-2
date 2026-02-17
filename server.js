require("module-alias/register");

const express = require("express");
const cors = require("cors");
const apiRouter = require("./src/routes");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
