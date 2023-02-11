const UserModel = require("./schema");

module.exports = class Users {
  // collection;
  // constructor(dbConnection) {
  //   this.collection = dbConnection.collection("users");
  // }
  static async list() {
    return await UserModel.find({});
  }

  // async getChild(params) {
  //   const result = await this.collection
  //     .aggregate([
  //       {
  //         $match: {
  //           _id: new ObjectId(params.id),
  //         },
  //       },
  //       {
  //         $unwind: "$childrens",
  //       },
  //       {
  //         $match: {
  //           "childrens.childrenId": new ObjectId(params.childrenId),
  //         },
  //       },
  //       {
  //         $project: {
  //           childrenId: "$childrens.childrenId",
  //           childrenName: "$childrens.childrenName",
  //           childrenAge: "$childrens.childrenAge",
  //         },
  //       },
  //     ])
  //     .toArray();
  //   return result;
  // }
  static async createUser(userData) {
    const user = new UserModel(userData);
    await user.save();

    return user;
  }
  // async getUser(userId) {
  //   const user = await this.collection.findOne({ _id: new ObjectId(userId) });
  //   return user;
  // }
  // async editUser(userId, userData) {
  //   await this.collection.updateOne(
  //     { _id: new ObjectId(userId) },
  //     { $set: { name: userData.name, phone: userData.phone } }
  //   );
  // }

  static async userDelete(_id) {
    await UserModel.deleteOne({ _id });
  }

  // async createChildren(userId, userData) {
  //   await this.collection.updateOne(
  //     { _id: new ObjectId(userId) },
  //     {
  //       $push: {
  //         childrens: {
  //           childrenId: new ObjectId(),
  //           childrenName: userData.name,
  //           childrenAge: userData.age,
  //         },
  //       },
  //     }
  //   );
  // }
  // async editChildren(params, childrenBody) {
  //   await this.collection.findOneAndUpdate(
  //     {
  //       _id: new ObjectId(params.id),
  //       "childrens.childrenId": new ObjectId(params.childrenId),
  //     },
  //     {
  //       $set: {
  //         "childrens.$.childrenName": childrenBody.name,
  //         "childrens.$.childrenAge": childrenBody.age,
  //       },
  //     }
  //   );
  // }
  // async deleteChildren(params) {
  //   await this.collection.updateOne(
  //     { _id: new ObjectId(params.id) },
  //     { $pull: { childrens: { childrenId: new ObjectId(params.childrenId) } } }
  //   );
  // }
};
