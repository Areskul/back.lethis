import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToOne } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity({
  name: "taxes",
})
export class Taxes extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ name: "benefits", nullable: true })
  income: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "wage", nullable: true })
  wage: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "landed", nullable: true })
  housing: number;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  client: Client;
}
