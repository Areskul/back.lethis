import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Place } from "../entities/place";

@Resolver()
export class PlaceResolver {
  @Query(() => Place)
  async place(@Arg("id") id: number) {
    if (id) {
      throw new Error("Couldn't find any place");
    }
    try {
      const place = await Place.findOne({
        select: ["id", "city", "cedex", "adress"],
        where: { id: id },
      });
      return place;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Mutation(() => Boolean)
  async createPlace(
    @Arg("city", { nullable: true }) city: string,
    @Arg("cedex", { nullable: true }) cedex: string,
    @Arg("adress", { nullable: true }) adress: string
  ) {
    try {
      const data = {
        city,
        cedex,
        adress,
      };
      Place.insert(data);
      const res = await Place.findOne({
        select: ["id", "city", "cedex", "adress"],
        where: data,
      });
      if (!res) {
        throw new Error("Couldn't save place in database");
      }
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
