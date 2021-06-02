import { InputType, Field, ID } from "type-graphql";
import { Charges } from "../entities/charges";

@InputType()
export class ChargesInput implements Partial<Charges> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  rent: string;

  @Field(() => String, { nullable: true })
  food: string;

  @Field(() => String, { nullable: true })
  energy: string;

  @Field(() => String, { nullable: true })
  isp: string;

  @Field(() => String, { nullable: true })
  school: string;

  @Field(() => String, { nullable: true })
  insurance: string;

  @Field(() => String, { nullable: true })
  help: string;

  @Field(() => String, { nullable: true })
  transports: string;

  @Field(() => String, { nullable: true })
  recreation: string;

  @Field(() => String, { nullable: true })
  holidays: string;

  @Field(() => String, { nullable: true })
  consumer: string;

  @Field(() => String, { nullable: true })
  others: string;

  @Field(() => String, { nullable: true })
  coownership: string;

  @Field(() => String, { nullable: true })
  total: string;

  @Field(() => String, { nullable: true })
  qp: string;

  @Field(() => String, { nullable: true })
  result: string;
}
