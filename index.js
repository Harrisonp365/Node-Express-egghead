const express = require("express");
const app = express();

const fs = require("fs");
const _ = require("lodash");
const engines = require("consolidate");
let users = [];

fs.readFile("users.json", { encoding: "utf8" }, function (err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + " " + user.name.last);
    users.push(user);
  });
});

app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/profilepics", express.static("images"));

app.get("/", function (req, res) {
  res.render("index", { users: users });
});

//Route placement in express matters, once res.send is called nothing else will be called!!
app.get("/:username", function (req, res) {
  let username = req.params.username;
  res.render("user", { username: username });
});

const server = app.listen(3000, function () {
  console.log("Server running on http://localhost:" + server.address().port);
});
