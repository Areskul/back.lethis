import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Client } from "../entities/client";

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(@Arg("id") id: number) {
    if (id) {
      throw new Error("Couldn't find any user");
    }
    try {
      const user = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { id: id },
      });
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async createClient(
    @Arg("lastname") lastname: string,
    @Arg("firstname") firstname: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("civilite", { nullable: true }) civilite: string,
    @Arg("birthdate", { nullable: true }) birthdate: string,
    @Arg("dependants", { nullable: true }) dependants: string,
    @Arg("employees", { nullable: true }) employees: string,
    @Arg("city", { nullable: true }) city: string,
    @Arg("cedex", { nullable: true }) cedex: string,
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("adress", { nullable: true }) adress: string
  ) {
    try {
      const data = {
        lastname,
        firstname,
        email,
        type,
        civilite,
        birthdate,
        dependants,
        job,
        employees,
        city,
        cedex,
        phone,
        retirementAge,
        adress,
        family,
      };
      Client.insert(data);
      const res = await Client.findOne({
        select: ["id", "lastname", "firstname", "email"],
        where: data,
      });
      if (!res) {
        throw new Error("Couldn't save client in database");
      }
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
