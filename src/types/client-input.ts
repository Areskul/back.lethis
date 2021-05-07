import { InputType, Field, ID } from "type-graphql";

import { Client, Gender } from "../entities/client";

@InputType()
export class ClientInput implements Partial<Client> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  family?: string;

  @Field({ nullable: true })
  birthdate?: string;

  @Field({ nullable: true })
  dependants?: string;

  @Field({ nullable: true })
  employees?: string;

  @Field({ nullable: true })
  retirementAge?: string;
}
