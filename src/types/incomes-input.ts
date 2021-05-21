import { InputType, Field, ID, Int } from "type-graphql";
import { Incomes } from "../entities/incomes";

@InputType()
export class IncomesInput implements Partial<Incomes> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => Int, { nullable: true })
  benefits: number;

  @Field(() => Int, { nullable: true })
  wage: number;

  @Field(() => Int, { nullable: true })
  landed: number;

  @Field(() => Int, { nullable: true })
  others: number;

  @Field(() => Int, { nullable: true })
  joint: number;

  @Field(() => Int, { nullable: true })
  total: number;

  @Field(() => Int, { nullable: true })
  qp: number;

  @Field(() => Int, { nullable: true })
  result: number;
}
