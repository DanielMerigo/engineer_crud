const model = require("../models/users");

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbConnection = client.db("eureca");

const modelInstance = new model(dbConnection);

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
    modelInstance.createUser(req.body);
    res.redirect("/users-list");
  },
  showUsers: async (req, res) => {
    let userList = await modelInstance.list();
    res.render("index", {
      title: "Users",
      message: "Lista de usuarios",
      data: userList,
      btn1: "edit",
      btn2: "delete",
    });
  },

  renderUsersEditForm: async (req, res) => {
    let user = await modelInstance.getUser(req.params.id);
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
  editUser: async (req, res) => {
    await modelInstance.editUser(req.params.id, req.body);
    res.redirect("/users-list");
  },
  deleteUser: async (req, res) => {
    await modelInstance.userDelete(req.params.id);
    res.redirect("/users-list");
  },
  renderChildrenForm: async (req, res) => {
    let user = await modelInstance.getUser(req.params.id);
    res.render("childrenForm", {
      title: "Add children",
      message: `Adicionar filho(a) para ${user.name}`,
      btn1: `Confirm`,
      route: `/user-childrens/${req.params.id}`,
    });
  },
  renderEditChildrens: async (req, res) => {
    let child = await modelInstance.getSon(req.params);
    res.render("childrenForm", {
      title: "Edit children",
      message: `Editar filho`,
      btn1: `Confirm`,
      route: `/edit-children/${req.params.id}/${req.params.children_id}`,
      childrenName: child[0].children_name,
      childrenAge: child[0].children_age,
    });
  },
  insertChildren: async (req, res) => {
    await modelInstance.createChildren(req.params.id, req.body);
    res.redirect("/users-list");
  },
  editChildren: async (req, res) => {
    await modelInstance.editChildren(req.params, req.body);
    res.redirect("/users-list");
  },
  deleteChildren: async (req, res) => {
    await modelInstance.deleteChildren(req.params);
    res.redirect("/users-list");
  },
};
