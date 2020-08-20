import { Resolver, Query } from "type-graphql";

@Resolver()
export class LocationResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hellol World from Areskul";
  }
}
