const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongodb");

class History {
  static getUserCollection() {
    return getDb().collection("history");
  }
  static async saved(alamat, image, queue, nama, userId) {
    console.log(
      alamat,
      image,
      queue,
      nama,
      userId,
      "<------------- ini masuk models"
    );
    const date = new Date();
    const userID = new ObjectId(userId);
    return await this.getUserCollection().insertOne({
      alamat,
      image,
      nama,
      queue,
      userID,
      date,
    });
  }
  static async getMyHistory(userId) {
    const userID = new ObjectId(userId);
    console.log(userID, "ini user ID di models <-------");
    return await this.getUserCollection().find({ userID }).toArray();
  }
  static async saveInvoice(
    invoice,
    date,
    name,
    price,
    queue,
    userId,
    orderBy,
    status
  ) {
    const userID = new ObjectId(userId);
    return await this.getUserCollection().insertOne({
      invoice,
      date,
      name,
      price,
      queue,
      userID,
      orderBy,
      status,
    });
  }
}

module.exports = History;
