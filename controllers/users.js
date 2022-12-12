const model = require("../models/users");

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
    let userList = model.createUser(req)
    model.write(userList)
    res.redirect("/users-list");
  },
  showUsers: (req, res) => {
    let userList = model.list();
    res.render("index", {
      title: "Users",
      message: "Lista de usuarios",
      data: userList,
      btn1: "edit",
      btn2: "delete",
    });
  },

  renderUsersEditForm: (req, res) => {
    let user = model.getUser(req)
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
    let userList = model.editUser(req)
    model.write(userList)
    res.redirect("/users-list");
  },
  deleteUser: (req, res) => {
    let userList = model.userDelete(req)
    model.write(userList)
    res.redirect("/users-list");
  },

  renderChildrenForm: (req, res) => {
    let user = model.getUser(req)
    res.render("childrenForm", {
      title: "Add children",
      message: `Adicionar filho(a) para ${user.name}`,
      btn1: `Confirm`,
      route: `/user-childrens/${req.params.id}`,
    });
  },
  renderEditChildrens: (req, res) => {
    let son = model.getSon(req)
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
    let userList = model.createChildren(req)
    model.write(userList)
    res.redirect("/users-list");
  },
  editChildren: (req, res) => {
    let userList = model.editChildren(req)
    model.write(userList)
    res.redirect("/users-list");
  },
  deleteChildren: (req, res) => {
    let userList = model.deleteChildren(req)
    model.write(userList)
    res.redirect("/users-list");
  },
};
