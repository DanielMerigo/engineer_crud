const fs = require("fs");

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
};
