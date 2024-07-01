const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongodb");

class Barbershop {
  static getUserCollection() {
    return getDb().collection("barbershop");
  }
  static async getAll() {
    return await this.getUserCollection().find().toArray();
  }
  static async getOne(id) {
    const _id = new ObjectId(id);
    return await this.getUserCollection().findOne({ _id });
  }
  static async updateQue(id) {
    const _id = new ObjectId(id);
    return await this.getUserCollection().updateOne(
      { _id },
      {
        $inc: { queue: 1 },
      }
    );
  }
}

module.exports = Barbershop;
