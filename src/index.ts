import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
//import { authPlugin } from "./middlewares/authPlugin";
require("dotenv").config();

//Resolvers
import { UserResolver } from "./resolvers/user.res";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  await createConnection().then(() => {
    console.log("Created connection to db");
  });
  const apollo = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization ? req.headers.authorization : "";
      const context = {
        req,
        token: token,
      };
      return context;
    },
  });
  const app = express();
  const ws = createServer(app);
  apollo.applyMiddleware({ app: app });
  apollo.installSubscriptionHandlers(ws);
  ws.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();
