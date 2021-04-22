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
import { ClientResolver } from "./resolvers/client.res";
import { PlaceResolver } from "./resolvers/place.res";
import { JobResolver } from "./resolvers/job.res";

const SECRET = process.env.APP_SECRET as string;

const main = async () => {
  const PORT = process.env.PORT!;
  const path = "/graphql";
  const sub_path = "/subscriptions";
  const app = express();
  const schema = await buildSchema({
    resolvers: [UserResolver, ClientResolver, PlaceResolver, JobResolver],
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
        const token = req.headers.authorization!;
        const user = token ? await decode(token, SECRET) : undefined;
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
