import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { encode } from "../middlewares/authPlugin";

import { User } from "../entities/user";

@ObjectType()
class Payload {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}

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
  @Mutation(() => Payload)
  async registerUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const hashedPassword = await hash(password, 12);
      const user = { name, email, password: hashedPassword };
      await User.insert(user);
      const res = (await User.findOne({ where: user })) as User;
      const id = { id: res.id };
      const token = encode(id);
      console.log(res);
      return {
        token: token,
        user: res,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Query(() => Payload, { nullable: true })
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
      const token = encode(id);
      console.log(token);
      console.log(user);

      return {
        token: token,
        user: res,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
