const Barbershop = require("../models/barbershop");

const typeDefs = `#graphql
  type Barbershop {
    _id:ID
    alamat: String
    image: String
    name: String
    queue:Int
    services:[Service]
    price:Int

  }
  type Service{
    service:String 
    price:Int
  }
  type FindBarber{
    userId: ID
    username :String
  }

  input idBarber{
    _id:ID
  }
  


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getBarbershop: [Barbershop]
    getOne(IdBarber:idBarber!):Barbershop
  }
  type Mutation{
    updateQueue(IdBarber:idBarber!):Barbershop
    
  }


`;

const resolvers = {
  Query: {
    getBarbershop: async (_, __, contextValue) => {
      const auth = await contextValue.authentication();
      // console.log(auth);
      const barber = await Barbershop.getAll();
      // console.log(barber, "<-----");
      return barber;
    },
    getOne: async (_, args, context) => {
      console.log(args, "ini args");
      const { _id } = args.IdBarber;
      const auth = await context.authentication();
      const findOne = await Barbershop.getOne(_id);
      console.log(findOne, "ini findOne");
      return findOne;
    },
  },
  Mutation: {
    updateQueue: async (_, args, context) => {
      console.log(args, "ini args");
      const { _id } = args.IdBarber;
      const auth = await context.authentication();
      const updateQ = await Barbershop.updateQue(_id);
      console.log(updateQ, "updateQ");
      return updateQ;
    },
  },
};

module.exports = { typeDefs, resolvers };
