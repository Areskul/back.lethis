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
  name: "realestate",
})
export class RealEstate extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ name: "fiscality", nullable: true })
  fiscality: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "owner", nullable: true })
  owner: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "name", nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "value", nullable: true })
  value: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "monthly", nullable: true })
  monthly: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "qp", nullable: true })
  qp: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  result: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "taxe", nullable: true })
  taxe: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "taxeResult", nullable: true })
  taxeResult: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "rest", nullable: true })
  rest: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "rate", nullable: true })
  rate: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "date", nullable: true })
  date: string;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  client: Client;
}
