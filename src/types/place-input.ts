import { InputType, Field } from "type-graphql";
import { Place } from "../entities/place";

@InputType()
export class PlaceInput implements Partial<Place> {
  @Field()
  adress?: string;

  @Field()
  cedex?: string;

  @Field()
  city?: string;
}
