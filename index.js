const express = require("express");
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const controller = require("./controllers/users");

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
