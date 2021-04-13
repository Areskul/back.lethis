import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";

import { Place } from "./place";
import { User } from "./user";

@ObjectType()
@Entity({
  name: "clients",
})
export class Client extends BaseEntity {
  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  firstname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  civilite?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  family?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthdate?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dependants?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  employees?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  job?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  retirementAge?: string;

  @Field(() => Place, { nullable: true })
  @ManyToOne(() => Place, (place) => place.clients)
  place: Place;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}
