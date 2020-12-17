import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../entities/user";
import { hash } from "bcryptjs";
import { encode } from "../middlewares/authPlugin";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() context: any) {
    return User.find({
      select: ["name", "email"],
      where: {
        id: context.user.id,
      },
    });
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
      const id = await User.insert(user);
      const token = encode({ userId: id });
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
