import { Resolver, Query } from "type-graphql";
import { Location } from "../entities/location";

@Resolver()
export class LocationResolver {
  @Query(() => [Location])
  async locations() {
    return Location.find();
  }
}
