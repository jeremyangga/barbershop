const { verifyToken } = require("../helper/jwt");
const User = require("../models/user");

async function authentication(req) {
  let token = req.headers.authorization;
  if (!token) {
    throw new Error("invalid token");
  }
  token = token.split(" ")[1];
  const decode = verifyToken(token);
  console.log(decode);
  const findUser = await User.findUserById(decode.userId);
  if (!findUser) {
    throw new Error("invalid token");
  }
  return { userId: findUser._id, username: findUser.username };
}
module.exports = authentication;
