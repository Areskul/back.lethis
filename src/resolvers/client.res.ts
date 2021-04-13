import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Client } from "../entities/client";
import { PlaceInput } from "../entities/place";

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(
    @Arg("id", { nullable: true }) id: string,
    @Arg("lastname", { nullable: true }) lastname: string,
    @Arg("firstname", { nullable: true }) firstname: string
  ) {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      const client = await Client.findOne({
        where: [
          { id: parseInt(id) },
          { lastname: lastname },
          { firstname: firstname },
        ],
      });
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Query(() => [Client])
  async clients() {
    try {
      const clients = await Client.find();
      return clients;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Client)
  async createClient(
    @Arg("lastname") lastname: string,
    @Arg("firstname") firstname: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("civilite", { nullable: true }) civilite: string,
    @Arg("birthdate", { nullable: true }) birthdate: string,
    @Arg("dependants", { nullable: true }) dependants: string,
    @Arg("employees", { nullable: true }) employees: string,
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("place", { nullable: true }) place: PlaceInput
  ) {
    try {
      if (!lastname || !firstname) {
        throw new Error(
          "lastname and firstname can't be null or empty strings"
        );
      }
      const data = {
        lastname: lastname,
        firstname: firstname,
        email: email,
        type: type,
        civilite: civilite,
        birthdate: birthdate,
        dependants: dependants,
        job: job,
        employees: employees,
        phone: phone,
        retirementAge: retirementAge,
        family: family,
        place: place,
      };
      Client.insert(data);
      const res = await Client.findOne({
        where: { firstname: firstname, lastname: lastname },
      });
      if (!res) {
        throw new Error("Couldn't save client in database");
      }
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Client)
  async updateClient(
    @Arg("id") id: string,
    @Arg("lastname", { nullable: true }) lastname: string,
    @Arg("firstname", { nullable: true }) firstname: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("civilite", { nullable: true }) civilite: string,
    @Arg("birthdate", { nullable: true }) birthdate: string,
    @Arg("dependants", { nullable: true }) dependants: string,
    @Arg("employees", { nullable: true }) employees: string,
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("place", { nullable: true }) place: PlaceInput
  ) {
    const data = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      type: type,
      civilite: civilite,
      birthdate: birthdate,
      dependants: dependants,
      job: job,
      employees: employees,
      phone: phone,
      retirementAge: retirementAge,
      family: family,
      place: place,
    };
    try {
      await Client.update(id, data);
      const client = await Client.findOne({
        where: { id: parseInt(id) },
      });
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async deleteClient(@Arg("id") id: string) {
    try {
      const client = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { id: id },
      });
      Client.delete({ id: parseInt(id) });
      return client;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
