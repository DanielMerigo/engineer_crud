const fs = require("fs");
const data = require("../data.json")
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
    let father = data.find((user) => user.id == req.params.id);
    let son = father.childrens.find(c => c.children_id == req.params.children_id);
    return son
  }
};
