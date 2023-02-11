const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const UsersController = require("./controllers/users.js");
require("dotenv").config();
const port = process.env.PORT;
mongoose.connect(process.env.URI).then(() => console.log("Connected!"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", UsersController.renderUsersForm);

app.post("/users-form", UsersController.insertUser);

app.get("/", UsersController.listUsers);

app.get("/users-delete/:id", UsersController.deleteUser);

app.get("/users-edit/:id", UsersController.renderUsersEditForm);

app.get("/user-childrens/:id", UsersController.renderChildrenForm);

app.post("/user-childrens/:id", UsersController.insertChildren);

app.get("/edit-children/:id/:childrenId", UsersController.renderEditChildrens);

app.post("/edit-children/:id/:childrenId", UsersController.editChildren);

app.get("/delete-children/:id/:childrenId", UsersController.deleteChildren);

app.post("/users-edit/:id", UsersController.editUser);

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});
