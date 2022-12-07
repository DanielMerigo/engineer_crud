const express = require("express");
const app = express();
const port = 5555;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
var data = require("./data.json");

data = fs.readFileSync("./data.json", { encoding: "utf8", flag: "r" });
data = JSON.parse(data);

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users-form", (req, res) => {
  res.render("userForm", {
    title: "Users",
    message: "Adicione um Usuario",
    btn1: "Enviar",
    route: "/users-form",
  });
});

app.post("/users-form", (req, res) => {
  req.body.id = uuidv4();
  req.body.childrens = [];
  data.push(req.body);
  let userData = JSON.stringify(data);
  fs.writeFile("./data.json", userData, (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/users-list");
});

app.get("/users-list", (req, res) => {
  let userList = fs.readFileSync("./data.json", {
    encoding: "utf8",
    flag: "r",
  });
  userList = JSON.parse(userList);
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
  let userList = JSON.stringify(data);
  fs.writeFile("./data.json", userList, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.redirect("/users-list");
});

app.get("/users-edit/:id", (req, res) => {
  let user = data.find((i) => i.id === req.params.id);
  res.render("userForm", {
    title: "Edit user",
    message: `Editar usuario`,
    btn1: `Confirm`,
    userId: req.params.id,
    userName: user.name,
    userPhone: user.phone,
    route: `/users-edit/${req.params.id}`,
  });
});

app.get("/user-childrens/:id", (req, res) => {
  let user = data.find((i) => i.id === req.params.id);
  res.render("childrenForm", {
    title: "Add children",
    message: `Adicionar filho(a) para ${user.name}`,
    btn1: `Confirm`,
    route: `/user-childrens/${req.params.id}`,
  });
});

app.post("/user-childrens/:id", (req, res) => {
  insertChildren(req)
  res.redirect("/users-list");
});


app.get("/edit-children/:id/:children_id", (req, res) => {
  let father = data.find((user) => user.id == req.params.id);
  let son = father.childrens.find(
    (children) => children.children_id == req.params.children_id
  );
  res.render("childrenForm", {
    title: "Edit children",
    message: `Editar filho`,
    btn1: `Confirm`,
    route: `/edit-children/${req.params.id}/${req.params.children_id}`,
    childrenName: son.children_name,
    childrenAge: son.children_age,
  });
});

app.post("/edit-children/:id/:children_id", (req, res) => {
  let father = data.find((user) => user.id == req.params.id);
  let son = father.childrens.find(
    (children) => children.children_id == req.params.children_id
  );
  son.children_name = req.body.name;
  son.children_age = req.body.age;

  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/users-list");
});

app.get("/delete-children/:id/:children_id", (req, res) => {
  let father = data.find(i => i.id == req.params.id)
  let sonIndex = father.childrens.findIndex(i => i.children_id == req.params.children_id);
  father.childrens.splice(sonIndex, 1);
  userList = JSON.stringify(data);

  fs.writeFile("./data.json", userList, (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/users-list");
});

app.post("/users-edit/:id", (req, res) => {
  let index = data.findIndex((i) => i.id === req.params.id);
  data[index].name = req.body.name;
  data[index].phone = req.body.phone;
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/users-list");
});

function insertChildren(req) {
  let user = data.find((i) => i.id === req.params.id);
  user.childrens.push({
    children_name: req.body.name,
    children_age: req.body.age,
    children_id: uuidv4(),
  });
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is online :) \nport: ${port}`);
});
