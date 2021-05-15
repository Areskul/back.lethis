import {
  Resolver,
  Query,
  Arg,
  Mutation,
  //Ctx
} from "type-graphql";
import { Client } from "../entities/client";
import { ClientInput } from "../types/client-input";
import { getConnection } from "typeorm";
import { Job } from "../entities/job";
import { JobInput } from "../types/job-input";
import { Place } from "../entities/place";
import { PlaceInput } from "../types/place-input";
//import { User } from "../entities/user";

//const jobRes = new JobResolver();

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(@Arg("id") id: string) {
    return Client.findOne({
      where: {
        id: id,
      },
      relations: ["job"],
    });
  }
  @Query(() => [Client])
  async clients() {
    return Client.find({
      order: {
        lastname: "ASC",
        firstname: "DESC",
      },
      relations: ["job"],
    });
  }
  @Mutation(() => Client)
  async updateClient(
    @Arg("client") clientInput: ClientInput,
    @Arg("job", { nullable: true }) jobInput: JobInput,
    @Arg("place", { nullable: true }) placeInput: PlaceInput
  ) {
    const clientData = Client.create(clientInput);
    const clientCond = clientInput.id ? { id: clientInput.id } : clientInput;

    clientInput.id
      ? await Client.update(clientInput.id, clientData)
      : await Client.save(clientData);

    let client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place"],
    });

    if (jobInput) {
      const job = await Job.findOne({
        where: jobInput,
      });
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "job")
        .of(client)
        .set(job);
    }
    client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place"],
    });

    if (placeInput) {
      let place = await Place.findOne({
        where: placeInput,
      });
      if (!place) {
        place = await Place.save(Place.create(placeInput));
      }
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "place")
        .of(client)
        .set(place);
    }
    client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place"],
    });

    return client;
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
