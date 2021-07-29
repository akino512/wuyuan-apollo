
import { ApolloServer, gql,AuthenticationError } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

import Mongo from "./core/Mongo";
const typeDefs = gql`
  type Todo{
    id:String
    content:String
  }

  type Query {
    todoList: [Todo]
  }

  type Mutation {
    # 个人推荐的“倒置命名法”：按照相关性调整单词顺序，而非传统英语顺序。
    # 这里几个方法都是处理Todo实例的，所以把todo放前面，如此可以对齐排版，提高易读性
    todoCreate(content: String): String
    todoDelete(id:String): String
    todoUpdate(id:String,content: String): String
  }

`;

// CRUD
export const resolvers = {
  Query: {
    todoList: async () => {
      const client = Mongo.getClient()
      try {
        await client.connect();
        const database = client.db('apollo');
        const collection = database.collection("todo");
        const todoList = await collection.find().toArray();
        console.log(todoList)
        return todoList
      } finally {
        await client.close()
      }
    },
  },
  Mutation: {
    todoCreate: async (_:any,args:any) => {
      console.log(args)
      const client = Mongo.getClient()
      try {
        await client.connect();
        const database = client.db('apollo');
        const collection = database.collection("todo");
        const uuid = uuidv4()
        const result = await collection.insertOne({...args,id:uuid})
        return uuid
      } finally {
        await client.close()
      }
    },
    todoDelete: async (_:any,args:any) => {
      console.log(args)
      const client = Mongo.getClient()
      try {
        await client.connect();
        const database = client.db('apollo');
        const collection = database.collection("todo");
        const result = await collection.findOneAndDelete(args)
        return args.id
      } finally {
        await client.close()
      }
    },
    todoUpdate: async (_:any,args:any) => {
      console.log(args)
      const client = Mongo.getClient()
      try {
        await client.connect();
        const database = client.db('apollo');
        const collection = database.collection("todo");
        const result = await collection.updateOne({id:args.id},{$set:{content:args.content}})
        return args.id
      } finally {
        await client.close()
      }
    },
  }
};

//start server
const server = new ApolloServer({ typeDefs, resolvers,
  context:({req })=>{
    const token = req.headers.authorization || '';
    // check token
    if(token!='wuyuan'){
      throw new AuthenticationError('you must be logged in');
    }
  }
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});