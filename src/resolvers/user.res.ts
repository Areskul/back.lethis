import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { encode } from "../middlewares/authPlugin";

import { User } from "../entities/user";
const SECRET = process.env.APP_SECRET as string;

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Ctx() ctx: any) {
    if (!ctx.user) {
      throw new Error("Couldn't find any user");
    }
    try {
      const user = await User.findOne({
        select: ["id", "name", "email"],
        where: ctx.user,
      });
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => String)
  async registerUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const hashedPassword = await hash(password, 12);
      const user = { name, email, password: hashedPassword };
      const res = await User.insert(user);
      const id = res.identifiers[0];
      const token = encode(id, SECRET);
      console.log(res);
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Query(() => String, { nullable: true })
  async loginUser(
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("password") password: string
  ) {
    try {
      const user = name ? { name: name } : { email: email };
      const res = await User.findOne({
        select: ["id", "name", "email", "password"],
        where: user,
      });

      if (!res) {
        throw new Error("Couldn't find any user");
      }
      const valid = await compare(password, res.password);
      if (!valid) {
        throw new Error("Bad password");
      }
      const id = { id: res.id };
      const token = encode(id, SECRET);
      console.log(token);
      console.log(user);
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Mutation(() => Boolean)
  async resetPassword(
    //@Ctx() ctx: any,
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string
    //@Arg("password") password: string
  ) {
    const user = name ? { name: name } : { email: email };
    const res = await User.findOne({
      select: ["id", "name", "email", "password"],
      where: user,
    });

    if (!res) {
      throw new Error("Couldn't find any user");
    }
    try {
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async getResetPasswordToken(
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string
  ) {
    const SECRET = process.env.APP_SECRET2 as string;
    const user = name ? { name: name } : { email: email };
    const res = await User.findOne({
      select: ["id", "name", "email"],
      where: user,
    });
    if (!res) {
      throw new Error("Couldn't find any user");
    }
    try {
      const id = { id: res.id };
      const secret = process.env.APP_SECRET2;
      const token = encode(id, SECRET);
      console.log(token + " " + secret);

      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
