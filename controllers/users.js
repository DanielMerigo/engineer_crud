const data = require("../data.json");
const { v4: uuidv4 } = require("uuid");
const usersModel = require("../models/users");

module.exports = {
  renderUsersForm: (req, res) => {
    res.render("userForm", {
      title: "Users",
      message: "Adicione um Usuario",
      btn1: "Enviar",
      route: "/users-form",
    });
  },
  insertUser: (req, res) => {
    req.body.id = uuidv4();
    req.body.childrens = [];
    data.push(req.body);
    userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },
  showUsers: (req, res) => {
    let userList = usersModel.list();
    res.render("index", {
      title: "Users",
      message: "Lista de usuarios",
      data: userList,
      btn1: "edit",
      btn2: "delete",
    });
  },

  renderUsersEditForm: (req, res) => {
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
  },
  editUser: (req, res) => {
    let user = data.find((i) => i.id === req.params.id);
    user.name = req.body.name;
    user.phone = req.body.phone;
    userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },
  deleteUser: (req, res) => {
    let index = data.findIndex((i) => i.id === req.params.id);
    data.splice(index, 1);
    let userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },

  renderChildrenForm: (req, res) => {
    let user = data.find((i) => i.id === req.params.id);
    res.render("childrenForm", {
      title: "Add children",
      message: `Adicionar filho(a) para ${user.name}`,
      btn1: `Confirm`,
      route: `/user-childrens/${req.params.id}`,
    });
  },
  renderEditChildrens: (req, res) => {
    let father = data.find((user) => user.id == req.params.id);
    let son = father.childrens.find((children) => children.children_id == req.params.children_id);
    res.render("childrenForm", {
      title: "Edit children",
      message: `Editar filho`,
      btn1: `Confirm`,
      route: `/edit-children/${req.params.id}/${req.params.children_id}`,
      childrenName: son.children_name,
      childrenAge: son.children_age,
    });
  },
  insertChildren: (req, res) => {
    let user = data.find((i) => i.id === req.params.id);
    user.childrens.push({
      children_name: req.body.name,
      children_age: req.body.age,
      children_id: uuidv4(),
    });
    userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },
  editChildren: (req, res) => {
    let father = data.find((user) => user.id == req.params.id);
    let son = father.childrens.find(children => children.children_id == req.params.children_id);
    son.children_name = req.body.name;
    son.children_age = req.body.age;
    userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },
  deleteChildren: (req, res) => {
    let father = data.find((i) => i.id == req.params.id);
    let sonIndex = father.childrens.findIndex(i => i.children_id == req.params.children_id);
    father.childrens.splice(sonIndex, 1);
    userList = JSON.stringify(data);
    usersModel.write(userList)
    res.redirect("/users-list");
  },
};
