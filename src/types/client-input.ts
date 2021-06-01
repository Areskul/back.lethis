import { InputType, Field, ID } from "type-graphql";

import { Client, Gender, Family, Type, Bool } from "../entities/client";

@InputType()
export class ClientInput implements Partial<Client> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  type: Type;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field({ nullable: true })
  family: Family;

  @Field({ nullable: true })
  birthdate: string;

  @Field(() => String, { nullable: true })
  dependants: string;

  @Field(() => Bool, { nullable: true })
  employees: Bool;

  @Field(() => String, { nullable: true })
  retirementAge: string;
}
