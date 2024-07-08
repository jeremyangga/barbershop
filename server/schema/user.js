const User = require("../models/user");
const { hashpw, compare } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const axios = require("axios");

const typeDefs = `#graphql
  type User {
    _id:ID
    name: String
    username: String
    email: String
    password: String
    phone_number: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getusers: [User]
    getUserByName(username:String):User
    getUserByID:User
  }

  input UserInput{
    name: String
    username: String!
    email: String!
    password: String!
    phone_number: String!
  }
  input LoginInput{
    email:String
    password:String
  }

  type Token{
    access_token:String
  }

  type Mutation{
    createUser(userInput:UserInput!):User
    login(loginInput:LoginInput!):Token
  }
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getusers: async (_, __, contextValue) => {
      const auth = await contextValue.authentication();
      console.log(auth);
      const users = await User.getUser();
      console.log(users, "<-----");
      return users;
    },
    getUserByID: async (_, __, contextValue) => {
      const auth = await contextValue.authentication();
      console.log(auth);

      const find = await User.getUserId(auth.userId);
      console.log(find, "ini find");
      return find;
    },
    getUserByName: async (_, args, context) => {
      const auth = await context.authentication();
      console.log(args);
      const findUser = await User.findUserByName(args.username);
      return findUser;
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      let newUser = { ...args.userInput };
      newUser.password = hashpw(newUser.password);
      const result = await User.create(newUser);
      console.log(result);
      return newUser;
    },
    login: async (_, args) => {
      //const { email, password } = args.loginInput;
      const { email, password } = args.loginInput;
      //const {data} = await axios.post('http://localhost:3000/login', {email, password});
      //return data;

      const findUser = await User.findEmail(email);
      if (!findUser) {
        throw new Error("user notfound");
      }
      const compared = compare(password, findUser.password);
      if (!compared) {
        throw new Error("not auhtorized");
      }
      const access_token = createToken({
        userId: findUser._id,
      });

      return { access_token };
    },
  },
};

module.exports = { typeDefs, resolvers };
