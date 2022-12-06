const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

var users = [];

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", (req, res) => {
  res.render("userForm", {
    title: "Users",
    message: "Adicione um Usuario",
    btn1: "Enviar",
    rote: "/users-form"
  });
});

app.post("/users-form", (req, res) => {
  req.body.id = uuidv4();
  users.push(req.body);
  res.redirect("/users-list");
});

app.get("/users-list", (req, res) => {
  res.render("index", {
    title: "Users",
    message: "Lista de usuarios",
    data: users,
    btn1: "edit",
    btn2: "delete",
  });
});

app.get("/users-delete/:id", (req, res) => {
  let index = users.findIndex((i) => i.id === req.params.id);
  users.splice(index, 1);
  res.redirect("/users-list");
});

app.get("/users-edit/:id", (req, res) => {
let index = users.findIndex((i) => i.id === req.params.id);
  res.render("userForm", {
    title: "Edit user",
    users: users,
    message: `Editar usuario`,
    btn1: `Confirm`,
    userId: req.params.id,
    userName: users[index].name,
    userPhone: users[index].phone,
    rote: `/users-edit/${req.params.id}`
  });
});

app.post("/users-edit/:id", (req, res) => {
  let index = users.findIndex((i) => i.id === req.params.id);
  users[index].name = req.body.name;
  users[index].phone = req.body.phone;
  res.redirect("/users-list");
});

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});
;