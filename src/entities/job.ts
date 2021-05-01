import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, Column, OneToMany, JoinTable, Unique } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity({
  name: "jobs",
})
@Unique(["name"])
export class Job extends BaseEntity {
  @Field()
  @Column({ name: "name" })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.job)
  @JoinTable()
  clients: Client[];
}

@InputType()
export class JobInput implements Partial<Job> {
  @Field()
  name: string;
}
