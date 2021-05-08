import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToMany, JoinTable, Unique } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity({
  name: "jobs",
})
@Unique(["name"])
export class Job extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ name: "name", nullable: true })
  name: string;

  @Field(() => [Client], { nullable: true })
  @OneToMany(() => Client, (client) => client.job)
  @JoinTable()
  clients: Client[];
}
