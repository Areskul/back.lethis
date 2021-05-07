import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { encode, decode } from "../middlewares/authPlugin";
import {
  sendResetPasswordMail,
  sendWelcomeMail,
} from "../middlewares/sendMail";

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
      const data = { name: name, email: email, password: hashedPassword };
      User.insert(data);
      const res = await User.findOne({
        select: ["id", "name", "email", "password"],
        where: data,
      });
      if (!res) {
        throw new Error("Couldn't register user");
      }
      const user = {
        id: res.id,
        name: res.name as string,
        email: res.email as string,
      };
      const token = encode(user, SECRET);
      console.log(res);
      const receivers = [user.email];
      sendWelcomeMail(user, receivers);
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Query(() => String, { nullable: true })
  async loginUser(
    @Arg("email", { nullable: true }) email: string,
    @Arg("password") password: string
  ) {
    try {
      const condition = [{ name: email }, { email: email }];
      const res = await User.findOne({
        select: ["id", "name", "email", "password"],
        where: condition,
      });

      if (!res) {
        throw new Error("Couldn't find any user");
      }
      const valid = await compare(password, res.password);
      if (!valid) {
        throw new Error("Bad password");
      }
      const user = {
        id: res.id,
        name: res.name as string,
        email: res.email as string,
      };
      const token = encode(user, SECRET);
      console.log(user);
      console.log(token);
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("password") password: string
  ) {
    try {
      const hashedPassword = await hash(password, 12);
      const data = token ? await decode(token, SECRET) : undefined;
      await User.update(data, { password: hashedPassword });
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
    const data = name ? { name: name } : { email: email };
    const res = await User.findOne({
      select: ["id", "name", "email"],
      where: data,
    });
    if (!res) {
      throw new Error("Couldn't find any user");
    }
    try {
      const user = {
        id: res.id,
        name: res.name as string,
        email: res.email as string,
      };
      const token = encode(user, SECRET) as string;
      const receivers = [user.email];
      sendResetPasswordMail(token, receivers);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
