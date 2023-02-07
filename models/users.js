const { ObjectId } = require("mongodb");

module.exports = class Users {
  constructor(dbConnection) {
    const users = dbConnection.collection("users");
    this.collection = users;
  }
  async list() {
    let userList = await this.collection.find({}).toArray();
    return userList;
  }
  async getChild(params) {
    const result = await this.collection
      .aggregate([
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
      ])
      .toArray();
    return result;
  }
  async createUser(userData) {
    userData.childrens = [];
    await this.collection.insertOne(userData);
  }
  async getUser(userId) {
    let user = await this.collection.findOne({ _id: new ObjectId(userId) });
    return user;
  }
  async editUser(userId, userData) {
    await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { name: userData.name, phone: userData.phone } }
    );
  }
  async userDelete(userId) {
    await this.collection.deleteOne({ _id: new ObjectId(userId) });
  }
  async createChildren(userId, userData) {
    await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          childrens: {
            childrenId: new ObjectId(),
            childrenName: userData.name,
            childrenAge: userData.age,
          },
        },
      }
    );
  }
  async editChildren(params, childrenBody) {
    await this.collection.findOneAndUpdate(
      {
        _id: new ObjectId(params.id),
        "childrens.childrenId": new ObjectId(params.childrenId),
      },
      {
        $set: {
          "childrens.$.childrenName": childrenBody.name,
          "childrens.$.childrenAge": childrenBody.age,
        },
      }
    );
  }
  async deleteChildren(params) {
    await this.collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $pull: { childrens: { childrenId: new ObjectId(params.childrenId) } } }
    );
  }
};
