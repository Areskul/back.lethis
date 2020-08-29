import { Resolver, Query } from "type-graphql";
import { User } from "../entities/user";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
}
