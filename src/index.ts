import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
require("dotenv").config();

//Resolvers
import { UserResolver } from "./resolvers/user.res";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  await createConnection().then(() => {
    console.log("Create connection");
  });
  const apollo = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        //user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    },
  });
  const app = Express();
  const ws = createServer(app);
  apollo.applyMiddleware({ app: app });
  apollo.installSubscriptionHandlers(ws);
  ws.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();
