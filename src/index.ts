import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createServer } from "http";
import authPlugin from "./middlewares/authPlugin";
require("dotenv").config();

//import jwt from "express-jwt";
//const APP_SECRET = "iamironman";

//Resolvers
import { UserResolver } from "./resolvers/user.res";

const main = async () => {
  const path = "/graphql";
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
        user: req.headers.user,
      };
      console.log(req.headers.user);
      console.log(req.headers.authorization);
      return context;
    },
  });
  const app = Express();
  app.use(path, authPlugin);
  const ws = createServer(app);
  apollo.applyMiddleware({ app: app, path: path });
  apollo.installSubscriptionHandlers(ws);
  ws.listen(8081, () => console.log("Server is listening on port 8081"));
};

main();
