import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
require("dotenv").config();

//Resolvers
import { LocationResolver } from "./resolvers/location.res";
import { UserResolver } from "./resolvers/user.res";
import { ProductResolver } from "./resolvers/product.res";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [LocationResolver, UserResolver, ProductResolver],
  });
  await createConnection().then(() => {
    console.log("Create connection");
  });
  const apollo = new ApolloServer({ schema });
  const app = Express();
  const ws = createServer(app);
  apollo.applyMiddleware({ app: app });
  apollo.installSubscriptionHandlers(ws);
  ws.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();
