import { ObjectType, Field, registerEnumType } from "type-graphql";
import { Entity, Column, OneToOne } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

export enum Fiscality {
  Aucune = "Aucune",
}
registerEnumType(Fiscality, {
  name: "Fiscality",
  description: "The basic genders",
});

@ObjectType()
@Entity({
  name: "RealEstate",
})
export class RealEstate extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ name: "benefits", nullable: true })
  benefits: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "wage", nullable: true })
  wage: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "landed", nullable: true })
  landed: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "others", nullable: true })
  others: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "joint", nullable: true })
  joint: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "total", nullable: true })
  total: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "qp", nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  result: number;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  client: Client;
}
