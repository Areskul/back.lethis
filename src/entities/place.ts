import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, Column, OneToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity("places")
export class Place extends BaseEntity {
  @Field()
  @Column()
  adress?: string;

  @Field()
  @Column()
  cedex?: string;

  @Field()
  @Column()
  city?: string;

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.place)
  @JoinTable()
  clients: Client[];
}

@InputType()
export class PlaceInput implements Partial<Place> {
  @Field()
  @Column({ nullable: true })
  adress?: string;

  @Field()
  @Column()
  cedex?: string;

  @Field()
  @Column()
  city?: string;
}
