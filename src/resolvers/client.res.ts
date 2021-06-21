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
import { Charges } from "../entities/charges";
import { ChargesInput } from "../types/charges-input";
import { Taxes } from "../entities/taxes";
import { TaxesInput } from "../types/taxes-input";
import { RealEstate } from "../entities/realestate";
import { RealEstateInput } from "../types/realestate-input";
//import { User } from "../entities/user";

@Resolver()
export class ClientResolver {
  async linkOrUpdate(
    client: any,
    rawInput: any,
    relationName: string,
    relation: any
  ) {
    let data = relation.create(rawInput);
    if (rawInput.id) {
      await relation.update(rawInput.id, data);
    } else {
      try {
        //let dataWithId = await relation.findOne({ where: data });
        //console.log(dataWithId);
        //await getConnection()
        //.createQueryBuilder()
        //.relation(Client, relationName)
        //.of(client)
        //.set(dataWithId);
        await getConnection()
          .createQueryBuilder()
          .relation(Client, relationName)
          .of(client)
          .set(data);
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
  @Query(() => Client)
  async client(@Arg("id") id: string) {
    return Client.findOne({
      where: {
        id: id,
      },
      relations: ["job", "place", "incomes", "charges", "taxes"],
    });
  }
  @Query(() => [Client])
  async clients() {
    return Client.find({
      order: {
        lastname: "ASC",
        firstname: "DESC",
      },
      relations: ["job", "place", "incomes", "charges", "taxes"],
    });
  }
  @Mutation(() => Client)
  async updateClient(
    @Arg("client") clientInput: ClientInput,
    @Arg("job", { nullable: true }) jobInput: JobInput,
    @Arg("place", { nullable: true }) placeInput: PlaceInput,
    @Arg("incomes", { nullable: true }) incomesInput: IncomesInput,
    @Arg("charges", { nullable: true }) chargesInput: ChargesInput,
    @Arg("taxes", { nullable: true }) taxesInput: TaxesInput,
    @Arg("realestate", { nullable: true }) realestateInput: RealEstateInput
  ) {
    const clientData = Client.create(clientInput);
    console.log(clientInput);
    const clientCond = clientInput.id ? { id: clientInput.id } : clientInput;
    clientInput.id
      ? await Client.update(clientInput.id, clientData)
      : await Client.save(clientData);
    let client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place", "incomes", "charges", "taxes"],
    });
    console.log("updateClient");
    if (jobInput) {
      const job = await Job.findOne({ where: jobInput });
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "job")
        .of(client)
        .set(job);
    }
    if (placeInput) await this.linkOrUpdate(client, placeInput, "place", Place);
    if (incomesInput)
      await this.linkOrUpdate(client, incomesInput, "incomes", Incomes);
    if (chargesInput)
      await this.linkOrUpdate(client, chargesInput, "charges", Charges);
    if (taxesInput) await this.linkOrUpdate(client, taxesInput, "taxes", Taxes);
    if (realestateInput)
      await this.linkOrUpdate(
        client,
        realestateInput,
        "realestate",
        RealEstate
      );

    client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place", "incomes", "charges", "taxes"],
    });
    return client;
  }

  @Mutation(() => Client)
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
