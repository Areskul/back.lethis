import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entities/user";
import { hash } from "bcryptjs";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async registerUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const hashedPassword = await hash(password, 12);
      await User.insert({
        name,
        email,
        password: hashedPassword,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
