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
  rent: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "food", nullable: true })
  food: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "energy", nullable: true })
  energy: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "isp", nullable: true })
  isp: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "school", nullable: true })
  school: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "insurance", nullable: true })
  insurance: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "help", nullable: true })
  help: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "transports", nullable: true })
  transports: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "recreation", nullable: true })
  recreation: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "holidays", nullable: true })
  holidays: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "consumer", nullable: true })
  consumer: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "others", nullable: true })
  others: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "coownership", nullable: true })
  coownership: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "total", nullable: true })
  total: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "qp", nullable: true })
  qp: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "result", nullable: true })
  result: string;

  @Field(() => Client, { nullable: true })
  @OneToOne(() => Client)
  client: Client;
}
