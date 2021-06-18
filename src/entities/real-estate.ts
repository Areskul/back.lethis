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
  fiscality: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "wage", nullable: true })
  owner: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "landed", nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "others", nullable: true })
  value: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "joint", nullable: true })
  monthly: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "total", nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "qp", nullable: true })
  result: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  taxe: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "qp", nullable: true })
  taxeResult: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  rest: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  rate: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "wage", nullable: true })
  date: string;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  client: Client;
}
