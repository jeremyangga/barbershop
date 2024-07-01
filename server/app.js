const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: typeDefsUsers,
  resolvers: resolversUsers,
} = require("./schema/user");

const {
  typeDefs: typeDefsBarbershop,
  resolvers: resolverBarbershop,
} = require("./schema/barbershop");
const {
  typeDefs: typeDefsHistory,
  resolvers: resolverHistory,
} = require("./schema/history");

const { connect } = require("./config/mongodb");
const authentication = require("./middleware/authentication");

const server = new ApolloServer({
  typeDefs: [typeDefsUsers, typeDefsBarbershop, typeDefsHistory],
  resolvers: [resolversUsers, resolverBarbershop, resolverHistory],
  introspection: true,
});

connect().then((database) => {
  console.log("connect mongo atlas");
  (async () => {
    try {
      const { url } = await startStandaloneServer(server, {
        listen: { port: 80 },
        context: async ({ req, res }) => ({
          authentication: async () => {
            return await authentication(req);
          },
        }),
      });

      console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
      console.log(error);
    }
  })();
});
