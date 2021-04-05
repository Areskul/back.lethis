import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Client } from "../entities/client";
import { PlaceInput } from "../entities/place";

@Resolver()
export class ClientResolver {
  @Query(() => Client)
  async client(@Arg("lastname") lastname: string) {
    try {
      const user = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: { lastname: lastname },
      });
      return user;
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
    @Arg("job", { nullable: true }) job: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Arg("retirementAge", { nullable: true }) retirementAge: string,
    @Arg("family", { nullable: true }) family: string,
    @Arg("place", { nullable: true }) place: PlaceInput
  ) {
    try {
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
        select: ["id", "lastname", "firstname", "email"],
        where: { lastname: lastname },
        //where: data,
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
