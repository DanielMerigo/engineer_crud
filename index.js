const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");
const fs = require("fs");
var data = require("./data.json");
const controller =  require("./controllers/users")

data = fs.readFileSync("./data.json", { encoding: "utf8", flag: "r" });
data = JSON.parse(data);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", controller.renderUsersForm);

app.post("/users-form", controller.insertUser);

app.get("/users-list", controller.showUsers)

app.get("/users-delete/:id", controller.deleteUser);

app.get("/users-edit/:id", controller.renderUsersEditForm);

app.get("/user-childrens/:id", controller.renderChildrenForm);

app.post("/user-childrens/:id", controller.insertChildren);

app.get("/edit-children/:id/:children_id", controller.renderEditChildrens);

app.post("/edit-children/:id/:children_id", controller.editChildren);

app.get("/delete-children/:id/:children_id", controller.deleteChildren);

app.post("/users-edit/:id", controller.editUser);

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});
