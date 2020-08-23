import { Resolver, Query } from "type-graphql";
import { Location } from "../entities/location";

@Resolver()
export class LocationResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hellol World from Areskul";
  }
  @Query(() => [Location])
  async locations() {
    return Location.find();
  }
}
