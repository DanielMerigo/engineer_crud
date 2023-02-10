const express = require("express");
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const usersController = require("./controllers/users.js")
const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://localhost:27017');
const dbConnection = client.db(process.env.DB);
const controller = new usersController(dbConnection);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", (req, res) => controller.renderUsersForm(req, res));

app.post("/users-form", (req, res) => controller.insertUser(req, res));

app.get("/users-list", (req, res) => controller.listUsers(req, res))

app.get("/users-delete/:id", (req, res) => controller.deleteUser(req, res));

app.get("/users-edit/:id", (req, res) => controller.renderUsersEditForm(req, res));

app.get("/user-childrens/:id", (req, res) => controller.renderChildrenForm(req, res));

app.post("/user-childrens/:id", (req, res) => controller.insertChildren(req, res));

app.get("/edit-children/:id/:childrenId", (req, res) => controller.renderEditChildrens(req, res));

app.post("/edit-children/:id/:childrenId", (req, res) => controller.editChildren(req, res));

app.get("/delete-children/:id/:childrenId", (req, res) => controller.deleteChildren(req, res));

app.post("/users-edit/:id", (req, res) => controller.editUser(req, res));

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});

