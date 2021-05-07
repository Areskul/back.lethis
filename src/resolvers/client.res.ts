import {
  Resolver,
  Query,
  Arg,
  Mutation,
  //Ctx
} from "type-graphql";
import { Client } from "../entities/client";
import { ClientInput } from "../types/client-input";
//import { PlaceInput } from "../types/place-input";
//import { User } from "../entities/user";
//import { JobResolver } from "./job.res";

//const jobRes = new JobResolver();

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(@Arg("id", { nullable: true }) id: string) {
    return Client.findOne(id);
  }
  @Query(() => [Client])
  async clients() {
    try {
      const clients = await Client.find({
        order: {
          lastname: "ASC",
          firstname: "DESC",
        },
      });
      return clients;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Client)
  async updateClient(@Arg("client") data: ClientInput) {
    const client = Client.create(data);
    data.id ? await Client.update(data.id, client) : await Client.save(client);
    const cond = data.id ? { id: data.id } : data;
    return Client.findOne(cond);
  }

  async deleteClient(@Arg("id") id: string) {
    try {
      const client = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { id: id },
      });
      Client.delete({ id: id });
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  //@Column({ nullable: true })
}
