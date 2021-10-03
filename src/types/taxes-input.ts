import { InputType, Field, ID } from "type-graphql";
import { Taxes } from "../entities/taxes";

@InputType()
export class TaxesInput implements Partial<Taxes> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  income: number;

  @Field(() => String, { nullable: true })
  wage: number;

  @Field(() => String, { nullable: true })
  housing: number;
}
