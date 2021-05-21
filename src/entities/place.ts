import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity("places")
export class Place extends BaseEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  adress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cedex?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;
}
