import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entities/user";
import { hash } from "bcryptjs";
import jwt from "jwt-simple";
const APP_SECRET = "iamironman";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
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
      const token = jwt.encode({ userId: id }, APP_SECRET, "HS256");
      return token;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
