const model = require("../models/users");

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.URI);
const dbConnection = client.db(process.env.DB);

const modelInstance = new model(dbConnection);

module.exports = {
  renderUsersForm: (req, res) => {
    res.render("userForm", {
      title: "Users",
      message: "Adicione um Usuario",
      submitBtn: "enviar",
      route: "/users-form",
    });
  },
  insertUser: async(req, res) => {
    await modelInstance.createUser(req.body);
    res.redirect("/users-list");
  },
  listUsers: async (req, res) => {
    let userList = await modelInstance.list();
    res.render("index", {
      title: "Users",
      message: "Lista de usuarios",
      data: userList,
      editBtn: "edit",
      deleteBtn: "delete",
    });
  },
  renderUsersEditForm: async (req, res) => {
    let user = await modelInstance.getUser(req.params.id);
    res.render("userForm", {
      title: "Edit user",
      message: `Editar usuario`,
      submitBtn: `Enviar`,
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
      submitBtn: `Enviar`,
      route: `/user-childrens/${req.params.id}`,
    });
  },
  renderEditChildrens: async (req, res) => {
    let child = await modelInstance.getChild(req.params);
    res.render("childrenForm", {
      title: "Edit children",
      message: `Editar filho`,
      submitBtn: `Enviar`,
      route: `/edit-children/${req.params.id}/${req.params.childrenId}`,
      childrenName: child[0].childrenName,
      childrenAge: child[0].childrenAge,
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
