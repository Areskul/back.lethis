import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { Gender, Client } from "../entities/client";
import { PlaceInput } from "../entities/place";
import { User } from "../entities/user";
import { JobResolver } from "./job.res";

const jobRes = new JobResolver();

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(
    @Arg("id", { nullable: true }) id: string,
    @Arg("lastname", { nullable: true }) lastname: string,
    @Arg("firstname", { nullable: true }) firstname: string
  ) {
    try {
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
  async createClient(
    @Ctx() ctx: any,
    @Arg("lastname") lastname: string,
    @Arg("firstname") firstname: string,
    @Arg("gender", { nullable: true }) gender: Gender,
    @Arg("email", { nullable: true }) email: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("birthdate", { nullable: true }) birthdate: string,
    @Arg("dependants", { nullable: true }) dependants: string,
    @Arg("employees", { nullable: true }) employees: string,
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("place", { nullable: true }) place: PlaceInput
  ) {
    const user = await User.findOne({
      select: ["id", "name", "email"],
      where: ctx.user,
    });
    const data = {
      lastname: lastname,
      firstname: firstname,
      gender: gender,
      email: email,
      type: type,
      birthdate: birthdate,
      dependants: dependants,
      employees: employees,
      phone: phone,
      retirementAge: retirementAge,
      family: family,
      place: place,
      user: user,
    };
    try {
      const exist = await Client.findOne({
        where: { firstname: firstname, lastname: lastname },
      });
      if (exist) {
        throw new Error("Client already exists in database");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    try {
      if (!lastname || !firstname) {
        throw new Error(
          "lastname and firstname can't be null or empty strings"
        );
      }
      jobRes.createJob(job);
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
    @Arg("gender", { nullable: true }) gender: Gender,
    @Arg("email", { nullable: true }) email: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("birthdate", { nullable: true }) birthdate: string,
    @Arg("dependants", { nullable: true }) dependants: string,
    @Arg("employees", { nullable: true }) employees: string,
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("place", { nullable: true }) place: PlaceInput
  ) {
    if (!id) {
      throw new Error("No id provided");
    }
    const data = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      type: type,
      gender: gender,
      birthdate: birthdate,
      dependants: dependants,
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
      const res = job ? await jobRes.createJob(job) : false;
      if (!res) {
        throw new Error("couldn't create Job");
      }
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
  //@Column({ nullable: true })
}
