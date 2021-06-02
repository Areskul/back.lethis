import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToOne } from "typeorm";
import { BaseEntity } from "./base";

import { Client } from "./client";

@ObjectType()
@Entity({
  name: "charges",
})
export class Charges extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ name: "rent", nullable: true })
  rent: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "food", nullable: true })
  food: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "energy", nullable: true })
  energy: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "isp", nullable: true })
  isp: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "school", nullable: true })
  school: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "insurance", nullable: true })
  insurance: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "help", nullable: true })
  help: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "transports", nullable: true })
  transports: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "recreation", nullable: true })
  recreation: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "holidays", nullable: true })
  holidays: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "consumer", nullable: true })
  consumer: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "others", nullable: true })
  others: number;

  @Field(() => String, { nullable: true })
  @Column({ name: "coownership", nullable: true })
  coownership: number;

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
