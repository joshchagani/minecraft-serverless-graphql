import "source-map-support/register";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-lambda";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/type-defs";
import BlockModel from "./models/block";

let conn: any = null;
const uri = process.env.DATABASE_URI as string;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/${process.env.NODE_ENV}/mineql`,
  },
  context: async ({ event, context }) => {
    context.callbackWaitsForEmptyEventLoop = false;
    if (conn == null) {
      conn = mongoose
        .connect(uri, {
          bufferCommands: false,
          bufferMaxEntries: 0,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .catch((err) => console.log(err.reason));
      await conn;
    }
    const doc = await BlockModel.findOne({ textType: "wild" }).exec();
    console.log("doc?", doc);
  },
});

export const commandCenter = apolloServer.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
