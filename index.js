const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");
const fs = require("fs");
var data = require("./data.json");
const usersController =  require("./controllers/users")

data = fs.readFileSync("./data.json", { encoding: "utf8", flag: "r" });
data = JSON.parse(data);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", usersController.renderUsersForm);

app.post("/users-form", usersController.insertUser);

app.get("/users-list", usersController.showUsers)

app.get("/users-delete/:id", usersController.deleteUser);

app.get("/users-edit/:id", usersController.renderUsersEditForm);

app.get("/user-childrens/:id", usersController.renderChildrenForm);

app.post("/user-childrens/:id", usersController.insertChildren);

app.get("/edit-children/:id/:children_id", usersController.renderEditChildrens);

app.post("/edit-children/:id/:children_id", usersController.editChildren);

app.get("/delete-children/:id/:children_id", usersController.deleteChildren);

app.post("/users-edit/:id", usersController.editUser);

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});
