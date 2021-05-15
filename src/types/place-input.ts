import { InputType, Field, ID } from "type-graphql";
import { Place } from "../entities/place";

@InputType()
export class PlaceInput implements Partial<Place> {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  adress: string;
  @Field(() => String, { nullable: true })
  cedex: string;
  @Field(() => String, { nullable: true })
  city: string;
}
