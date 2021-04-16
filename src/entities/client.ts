import { ObjectType, Field, registerEnumType } from "type-graphql";
import { Entity, Column, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./base";

import { Place } from "./place";
import { User } from "./user";
import { Job } from "./job";

export enum Gender {
  Monsieur = "Monsieur",
  Madame = "Madame",
}

registerEnumType(Gender, {
  name: "Gender",
  description: "The basic directions",
});

@ObjectType()
@Entity({
  name: "clients",
})
@Unique(["lastname", "firstname"])
export class Client extends BaseEntity {
  @Field()
  @Column({ name: "lastname" })
  lastname: string;

  @Field()
  @Column({ name: "firstname" })
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

  @Field(() => Gender)
  @Column({ nullable: true })
  gender?: Gender;

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
  retirementAge?: string;

  @Field(() => Place, { nullable: true })
  @ManyToOne(() => Place, (place) => place.clients)
  place: Place;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, (job) => job.clients)
  job: Job;
}
