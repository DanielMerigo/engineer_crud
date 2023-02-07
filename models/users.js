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
            "childrens.children_id": new ObjectId(params.children_id),
          },
        },
        {
          $project: {
            children_id: "$childrens.children_id",
            children_name: "$childrens.children_name",
            children_age: "$childrens.children_age",
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
            children_id: new ObjectId(),
            children_name: userData.name,
            children_age: userData.age,
          },
        },
      }
    );
  }
  async editChildren(params, childrenBody) {
    await this.collection.findOneAndUpdate(
      {
        _id: new ObjectId(params.id),
        "childrens.children_id": new ObjectId(params.children_id),
      },
      {
        $set: {
          "childrens.$.children_name": childrenBody.name,
          "childrens.$.children_age": childrenBody.age,
        },
      }
    );
  }
  async deleteChildren(params) {
    await this.collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $pull: { childrens: { children_id: new ObjectId(params.children_id) } } }
    );
  }
};
