const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs")
var data = require("./data.json")

data = fs.readFileSync('./data.json', {encoding:'utf8', flag:'r'})
data = JSON.parse(data)

var users = [];
// var userData = ""

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
  data.push(req.body)
  // users.push(req.body);
   let userData = JSON.stringify(data)
  fs.writeFile('./data.json', userData, err => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/users-list");
});

app.get("/users-list", (req, res) => {
  let userList = fs.readFileSync('./data.json', {encoding:'utf8', flag:'r'});
  userList = JSON.parse(userList)
  res.render("index", {
    title: "Users",
    message: "Lista de usuarios",
    data: userList,
    btn1: "edit",
    btn2: "delete",
  });
  
});

app.get("/users-delete/:id", (req, res) => {
  let index = data.findIndex((i) => i.id === req.params.id);
  data.splice(index, 1);
  let userList = JSON.stringify(data)
  fs.writeFile('./data.json', userList, err => {
    if (err) {
      console.error(err);
    }
  });

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