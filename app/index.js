const express = require("express");
const app = express();
const routeHandler = require("./api");

//localhost:3000/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "GET - root",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

app.use("/api/v1", routeHandler);

module.exports = app;
