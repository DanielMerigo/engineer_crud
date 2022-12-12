const fs = require("fs");
const data = require("../data.json");
const { v4: uuidv4 } = require("uuid");

module.exports = class Users {
  static list() {
    let userList = fs.readFileSync("./data.json", {
      encoding: "utf8",
      flag: "r",
    });
    return JSON.parse(userList);
  }
  static write(userList) {
    fs.writeFile("./data.json", userList, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  static getSon(req) {
    let user = data.find((user) => user.id == req.params.id);
    let son = user.childrens.find(c => c.children_id == req.params.children_id);
    return son
  }
  static createUser(userData) {
    userData.body.id = uuidv4();
    userData.body.childrens = [];
    data.push(userData.body);
    let userList = JSON.stringify(data);
    return userList
  }
  static getUser(req) {
    let user = data.find((i) => i.id === req.params.id);
    return user
  }
  static editUser(req) {
    let user = data.find((i) => i.id === req.params.id);
    user.name = req.body.name;
    user.phone = req.body.phone;
    let userList = JSON.stringify(data);
    return userList
  }
  static userDelete(req) {
    let index = data.findIndex((i) => i.id === req.params.id);
    data.splice(index, 1);
    let userList = JSON.stringify(data);
    return userList
  }
  static createChildren(req) {
    let user = data.find((i) => i.id === req.params.id);
    user.childrens.push({
      children_name: req.body.name,
      children_age: req.body.age,
      children_id: uuidv4(),
    });
    let userList = JSON.stringify(data);
    return userList
  }
  static editChildren(req) {
    let user = data.find((user) => user.id == req.params.id);
    let son = user.childrens.find(c => c.children_id == req.params.children_id);
    son.children_name = req.body.name;
    son.children_age = req.body.age;
    let userList = JSON.stringify(data);
    return userList
  }
  static deleteChildren(req) {
    let user = data.find((i) => i.id == req.params.id);
    let sonIndex = user.childrens.findIndex(i => i.children_id == req.params.children_id);
    user.childrens.splice(sonIndex, 1);
    let userList = JSON.stringify(data);
    return userList
  }

};
