const { ObjectId } = require("bson");
const { UserModel } = require("./schema");

module.exports = class Users {
  static async list() {
    return await UserModel.find({});
  }
  static async getChild(params) {
    const result = await UserModel.aggregate([
      {
        $match: {
          _id: new ObjectId(params.id),
        },
      },
      {
        $unwind: "$childrens",
      },
      {
        $match: {
          "childrens.childrenId": new ObjectId(params.childrenId),
        },
      },
      {
        $project: {
          childrenId: "$childrens.childrenId",
          childrenName: "$childrens.childrenName",
          childrenAge: "$childrens.childrenAge",
        },
      },
    ]);
    return result;
  }
  static async createUser(userData) {
    const user = new UserModel(userData);
    await user.save();
    return user;
  }
  static async getUser(_id) {
    return await UserModel.findOne({ _id });
  }
  static async editUser(_id, userData) {
    await UserModel.updateOne(
      { _id },
      { $set: { name: userData.name, phone: userData.phone } }
    );
  }
  static async userDelete(_id) {
    await UserModel.deleteOne({ _id });
  }
  static async createChildren(_id, userData) {
    await UserModel.updateOne(
      { _id },
      {
        $push: {
          childrens: {
            childrenId: ObjectId(),
            childrenName: userData.name,
            childrenAge: userData.age,
          },
        },
      }
    );
  }
  static async editChildren(params, childrenBody) {
    await UserModel.findOneAndUpdate(
      {
        _id: params.id,
        "childrens.childrenId": params.childrenId,
      },
      {
        $set: {
          "childrens.$.childrenName": childrenBody.name,
          "childrens.$.childrenAge": childrenBody.age,
        },
      }
    );
  }
  static async deleteChildren(params) {
    await UserModel.findOneAndUpdate(
      { _id: params.id },
      { $pull: { childrens: { childrenId: params.childrenId } } }
    );
  }
};
