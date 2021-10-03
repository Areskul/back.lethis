import { InputType, Field, ID } from "type-graphql";
import { RealEstate } from "../entities/realestate";

@InputType()
export class RealEstateInput implements Partial<RealEstate> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  fiscality: string;

  @Field(() => String, { nullable: true })
  owner: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  value: number;

  @Field(() => String, { nullable: true })
  monthly: number;

  @Field(() => String, { nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  result: number;

  @Field(() => String, { nullable: true })
  taxe: number;

  @Field(() => String, { nullable: true })
  taxeResult: number;

  @Field(() => String, { nullable: true })
  rest: number;

  @Field(() => String, { nullable: true })
  rate: number;

  @Field(() => String, { nullable: true })
  date: string;
}
