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
import { Incomes } from "../entities/incomes";
import { IncomesInput } from "../types/incomes-input";
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
      relations: ["job", "place", "incomes"],
    });
  }
  @Query(() => [Client])
  async clients() {
    return Client.find({
      order: {
        lastname: "ASC",
        firstname: "DESC",
      },
      relations: ["job", "place", "incomes"],
    });
  }
  @Mutation(() => Client)
  async updateClient(
    @Arg("client") clientInput: ClientInput,
    @Arg("job", { nullable: true }) jobInput: JobInput,
    @Arg("place", { nullable: true }) placeInput: PlaceInput,
    @Arg("incomes", { nullable: true }) incomesInput: IncomesInput
  ) {
    const clientData = Client.create(clientInput);
    const clientCond = clientInput.id ? { id: clientInput.id } : clientInput;

    clientInput.id
      ? await Client.update(clientInput.id, clientData)
      : await Client.save(clientData);

    let client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place", "incomes"],
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

    if (incomesInput) {
      const incomesData = Incomes.create(incomesInput);
      const incomesCond = incomesInput.id
        ? { id: incomesInput.id }
        : clientInput;
      incomesInput.id
        ? await Incomes.update(incomesInput.id, incomesData)
        : await Incomes.save(incomesData);
      const incomes = await Incomes.findOne({
        where: incomesCond,
      });
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "incomes")
        .of(client)
        .set(incomes);
    }

    client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place", "incomes"],
    });

    return client;
  }

  async deleteClient(@Arg("id") id: string) {
    try {
      const client = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { id: id },
      });
      Client.delete(id);
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
