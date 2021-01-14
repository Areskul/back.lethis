import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
import { decode } from "./middlewares/authPlugin";
import "dotenv/config";
//Resolvers
import { UserResolver } from "./resolvers/user.res";
import { PostResolver } from "./resolvers/post.res";

const main = async () => {
  const PORT = process.env.PORT!;
  const path = "/graphql";
  const sub_path = "/subscriptions";
  const app = express();
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver],
    //authMode: "null",
  });
  await createConnection();
  const server = new ApolloServer({
    schema,
    subscriptions: {
      path: sub_path,
    },
    context: async ({ req, connection }) => {
      if (connection) {
        return connection.context;
      } else {
        const token = req.headers.authorization || false;
        const user = token ? await decode(token) : {};
        const context = {
          req,
          user: user,
        };
        return context;
      }
    },
  });
  const ws = createServer(app);
  server.applyMiddleware({ app: app, path: path });
  server.installSubscriptionHandlers(ws);
  ws.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );
  });
};

main();
