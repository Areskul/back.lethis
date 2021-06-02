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
    @Arg("taxes", { nullable: true }) taxesInput: TaxesInput
  ) {
    const clientData = Client.create(clientInput);
    const clientCond = clientInput.id ? { id: clientInput.id } : clientInput;

    clientInput.id
      ? await Client.update(clientInput.id, clientData)
      : await Client.save(clientData);

    let client = await Client.findOne({
      where: clientCond,
      relations: ["job", "place", "incomes", "charges", "taxes"],
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
        : incomesInput;
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

    if (chargesInput) {
      const chargesData = Charges.create(chargesInput);
      const chargesCond = chargesInput.id
        ? { id: chargesInput.id }
        : chargesInput;
      chargesInput.id
        ? await Charges.update(chargesInput.id, chargesData)
        : await Charges.save(chargesData);
      const charges = await Charges.findOne({
        where: chargesCond,
      });
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "charges")
        .of(client)
        .set(charges);
    }

    if (taxesInput) {
      const taxesData = Taxes.create(taxesInput);
      const taxesCond = taxesInput.id ? { id: taxesInput.id } : taxesInput;
      taxesInput.id
        ? await Taxes.update(taxesInput.id, taxesData)
        : await Taxes.save(taxesData);
      const taxes = await Taxes.findOne({
        where: taxesCond,
      });
      await getConnection()
        .createQueryBuilder()
        .relation(Client, "taxes")
        .of(client)
        .set(taxes);
    }

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
