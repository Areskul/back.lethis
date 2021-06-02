import { InputType, Field, ID } from "type-graphql";
import { Charges } from "../entities/charges";

@InputType()
export class ChargesInput implements Partial<Charges> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  rent: number;

  @Field(() => String, { nullable: true })
  food: number;

  @Field(() => String, { nullable: true })
  energy: number;

  @Field(() => String, { nullable: true })
  isp: number;

  @Field(() => String, { nullable: true })
  school: number;

  @Field(() => String, { nullable: true })
  insurance: number;

  @Field(() => String, { nullable: true })
  help: number;

  @Field(() => String, { nullable: true })
  transports: number;

  @Field(() => String, { nullable: true })
  recreation: number;

  @Field(() => String, { nullable: true })
  holidays: number;

  @Field(() => String, { nullable: true })
  consumer: number;

  @Field(() => String, { nullable: true })
  others: number;

  @Field(() => String, { nullable: true })
  coownership: number;

  @Field(() => String, { nullable: true })
  total: number;

  @Field(() => String, { nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  result: number;
}
