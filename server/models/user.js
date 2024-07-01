const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongodb");

class User {
  static getUserCollection() {
    return getDb().collection("users");
  }
  static async getUserId(id) {
    const _id = new ObjectId(id);
    return await this.getUserCollection().findOne({ _id });
  }

  static async findEmail(email) {
    return await this.getUserCollection().findOne({ email });
  }

  static async findUserById(id) {
    return await this.getUserCollection().findOne({ _id: new ObjectId(id) });
  }
  static async findUserByName(username) {
    return await this.getUserCollection().findOne({ username });
  }

  static async getUser() {
    const user = await this.getUserCollection().find().toArray();
    return user;
  }
  static async create(user) {
    const newUser = await this.getUserCollection().insertOne(user);
    return newUser;
  }
}

module.exports = User;
