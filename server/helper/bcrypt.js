const bcrypt = require("bcryptjs");

const hashpw = (hash) => bcrypt.hashSync(hash, 8);
const compare = (pasword, hashed) => bcrypt.compareSync(pasword, hashed);

module.exports = { hashpw, compare };
