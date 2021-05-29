import { InputType, Field, ID } from "type-graphql";
import { Charges } from "../entities/charges";

@InputType()
export class IncomesInput implements Partial<Charges> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  benefits: number;

  @Field(() => String, { nullable: true })
  wage: number;

  @Field(() => String, { nullable: true })
  landed: number;

  @Field(() => String, { nullable: true })
  others: number;

  @Field(() => String, { nullable: true })
  joint: number;

  @Field(() => String, { nullable: true })
  total: number;

  @Field(() => String, { nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  result: number;
}
