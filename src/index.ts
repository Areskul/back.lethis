import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { LocationResolver } from "./resolvers/location.res";
require("dotenv").config();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [LocationResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();