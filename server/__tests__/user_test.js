const { makeExecutableSchema } = require("graphql-tools");
const { graphql } = require("graphql");
const { typeDefs, resolvers } = require("../schema/user"); // Adjust the path accordingly

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Mock contextValue for authentication
const mockContextValue = {
  authentication: jest.fn(() => ({ userId: "mockUserId" })),
};

describe("GraphQL Resolvers", () => {
  describe("Query.getusers", () => {
    it("should return an array of users", async () => {
      const query = `
        query {
          getusers {
            _id
            name
            username
            email
            password
          }
        }
      `;

      const result = await graphql(schema, query, null, mockContextValue);
      expect(result.errors).toBeUndefined();
      expect(result.data.getusers).toEqual(expect.any(Array));
    });
  });

  describe("Query.getUserByID", () => {
    it("should return a user by ID", async () => {
      const query = `
        query {
          getUserByID {
            _id
            name
            username
            email
            password
          }
        }
      `;

      const result = await graphql(schema, query, null, mockContextValue);
      expect(result.errors).toBeUndefined();
      expect(result.data.getUserByID).toEqual(expect.any(Object));
    });
  });

  // Add similar test cases for other queries and mutations

  describe("Mutation.createUser", () => {
    it("should create a new user", async () => {
      const mutation = `
        mutation {
          createUser(userInput: {
            name: "Test User"
            username: "testuser"
            email: "test@example.com"
            password: "testpassword"
          }) {
            _id
            name
            username
            email
            password
          }
        }
      `;

      const result = await graphql(schema, mutation, null, mockContextValue);
      expect(result.errors).toBeUndefined();
      expect(result.data.createUser).toEqual(expect.any(Object));
    });
  });

  describe("Mutation.login", () => {
    it("should return an access token upon successful login", async () => {
      const mutation = `
        mutation {
          login(loginInput: {
            email: "test@example.com"
            password: "testpassword"
          }) {
            access_token
          }
        }
      `;

      const result = await graphql(schema, mutation, null, mockContextValue);
      expect(result.errors).toBeUndefined();
      expect(result.data.login.access_token).toEqual(expect.any(String));
    });

    it("should throw an error for invalid login credentials", async () => {
      // Add a test case for invalid login credentials
    });
  });
});
