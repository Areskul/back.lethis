import { ObjectType, Field, registerEnumType } from "type-graphql";
import { Entity, Column, ManyToOne, OneToOne, Unique } from "typeorm";
import { BaseEntity } from "./base";

import { Place } from "./place";
import { User } from "./user";
import { Job } from "./job";
import { Incomes } from "./incomes";

export enum Gender {
  Monsieur = "Monsieur",
  Madame = "Madame",
}
registerEnumType(Gender, {
  name: "Gender",
  description: "The basic genders",
});
export enum Family {
  Celibataire = "Celibataire",
  Paxe = "Paxe",
  Marie = "Marie",
  Veuf = "Veuf",
}
registerEnumType(Family, {
  name: "Family",
  description: "Family situation",
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

  @Field(() => Family, { nullable: true })
  @Column({ nullable: true })
  family?: Family;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthdate?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  dependants?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  employees?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  retirementAge?: string;

  @Field(() => Place, { nullable: true })
  @OneToOne(() => Place, (place) => place.client)
  place: Place;

  @Field(() => Incomes, { nullable: true })
  @OneToOne(() => Incomes)
  incomes: Incomes;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, (job) => job.clients)
  job: Job;
}
