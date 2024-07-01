const History = require("../models/history");

const typeDefs = `#graphql

 input Invoice{
    invoice: String
    name:String
    date: String
    price: Int
    queue:Int
    orderBy:String
    status:String
 }
 type InvoiceBill{
    _id: ID
    invoice: String
    name:String
    date: String
    price: Int
    queue:Int
    userID:ID
    orderBy:String
    status:String
 }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query{
    getHistory:[InvoiceBill]
  }

  type Mutation{
    saveInvoice(invoiceSave:Invoice):InvoiceBill
  }


`;

const resolvers = {
  Mutation: {
    saveInvoice: async (_, args, context) => {
      const { invoiceSave } = args;
      console.log(invoiceSave);
      const auth = await context.authentication();
      console.log(auth, "<----- ini auth");
      const newInvoice = await History.saveInvoice(
        invoiceSave.invoice,
        invoiceSave.date,
        invoiceSave.name,
        invoiceSave.price,
        invoiceSave.queue,
        auth.userId,
        auth.username,
        invoiceSave.status
      );
      return newInvoice;
    },
  },
  Query: {
    getHistory: async (_, args, context) => {
      const auth = await context.authentication();
      // console.log(auth, "ini auth");
      // console.log(auth.userId);
      const myHistory = await History.getMyHistory(auth.userId);
      console.log(myHistory, "my history");
      return myHistory;
    },
  },
};

module.exports = { typeDefs, resolvers };
