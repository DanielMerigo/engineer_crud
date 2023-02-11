const UsersModel = require("../models/users.js");
const userList = "/";

module.exports = class UsersController {
  // model;
  // constructor(dbConnection) {
  //   this.model = new UsersModel(dbConnection);
  // }
  static async insertUser(req, res) {
    await UsersModel.createUser(req.body);
    res.redirect(userList);
  }

  static async renderUsersForm(req, res) {
    res.render("userForm", {
      title: "Users",
      message: "Adicione um Usuario",
      submitBtn: "enviar",
      route: "/users-form",
    });
  }

  static async listUsers(req, res) {
    const userList = await UsersModel.list();

    res.render("index", {
      title: "Users",
      message: "Lista de usuarios",
      data: userList,
      editBtn: "edit",
      deleteBtn: "delete",
    });
  }
  // async renderUsersEditForm(req, res) {
  //   let user = await this.model.getUser(req.params.id);
  //   res.render("userForm", {
  //     title: "Edit user",
  //     message: `Editar usuario`,
  //     submitBtn: `Enviar`,
  //     userId: req.params.id,
  //     userName: user.name,
  //     userPhone: user.phone,
  //     route: `/users-edit/${req.params.id}`,
  //   });
  // }
  // async editUser(req, res) {
  //   await this.model.editUser(req.params.id, req.body);
  //   res.redirect(userList);
  // }
  // async editUser(req, res) {
  //   await this.model.editUser(req.params.id, req.body);
  //   res.redirect(userList);
  // }

  static async deleteUser(req, res) {
    await UsersModel.userDelete(req.params.id);
    res.redirect(userList);
  }

  // async renderChildrenForm(req, res) {
  //   let user = await this.model.getUser(req.params.id);
  //   res.render("childrenForm", {
  //     title: "Add children",
  //     message: `Adicionar filho(a) para ${user.name}`,
  //     submitBtn: `Enviar`,
  //     route: `/user-childrens/${req.params.id}`,
  //   });
  // }
  // async renderEditChildrens(req, res) {
  //   let child = await this.model.getChild(req.params);
  //   res.render("childrenForm", {
  //     title: "Edit children",
  //     message: `Editar filho`,
  //     submitBtn: `Enviar`,
  //     route: `/edit-children/${req.params.id}/${req.params.childrenId}`,
  //     childrenName: child[0].childrenName,
  //     childrenAge: child[0].childrenAge,
  //   });
  // }
  // async insertChildren(req, res) {
  //   await this.model.createChildren(req.params.id, req.body);
  //   res.redirect(userList);
  // }
  // async editChildren(req, res) {
  //   await this.model.editChildren(req.params, req.body);
  //   res.redirect(userList);
  // }
  // async deleteChildren(req, res) {
  //   await this.model.deleteChildren(req.params);
  //   res.redirect(userList);
  // }
};
