const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildrenSchema = new Schema({
  childrenName: String,
  childrenAge: Number,
});

const UserSchema = new Schema({
  name: { type: String, default: "?" },
  phone: Number,
  childrens: [ChildrenSchema],
});
const UserModel = mongoose.model("Users", UserSchema);

module.exports = { UserModel };
