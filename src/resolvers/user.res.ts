import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../entities/user";
import { hash } from "bcryptjs";
import { encode } from "../middlewares/authPlugin";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Ctx() ctx: any) {
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
      const token = encode(id);
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
