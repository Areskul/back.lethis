import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Client } from "../entities/client";

@Resolver()
export class UserResolver {
  @Query(() => Client)
  async user(@Arg("id") id: number) {
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
  async registerUser(
    @Arg("lastname") lastname: string,
    @Arg("firstname") firstname: string,
    @Arg("email") email: string
  ) {
    try {
      const data = { lastname, firstname, email };
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
  @Query(() => Client)
  async loginUser(
    //@Arg("id", { nullable: true }) id: number,
    @Arg("lastname", { nullable: true }) lastname: string,
    @Arg("firstname", { nullable: true }) firstname: string
  ) {
    try {
      const data = lastname ? { lastname: lastname } : { firstname: firstname };
      const res = await Client.findOne({
        select: ["id", "lastname", "firstname"],
        where: data,
      });

      if (!res) {
        throw new Error("Couldn't find any client");
      }
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
