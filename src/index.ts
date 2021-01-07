import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
import { decode } from "./middlewares/authPlugin";
require("dotenv").config();

//Resolvers
import { UserResolver } from "./resolvers/user.res";

const main = async () => {
  const path = "/graphql";
  const app = express();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authMode: "null",
  });
  await createConnection().then(() => {
    console.log("Created connection to db");
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || false;
      const user = token ? decode(token) : {};
      const context = {
        req,
        user: user,
      };
      return context;
    },
  });
  const ws = createServer(app);
  server.applyMiddleware({ app: app, path: path });
  server.installSubscriptionHandlers(ws);
  ws.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();
