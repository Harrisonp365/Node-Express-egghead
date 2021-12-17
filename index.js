const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("hello world!");
});

app.get("/yo", function (req, res) {
  res.send("Yo");
});

const server = app.listen(3000, function () {
  console.log("Server running on http://localhost:" + server.address().port);
});
