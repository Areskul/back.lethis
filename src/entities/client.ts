import { ObjectType, Field, registerEnumType } from "type-graphql";
import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  Unique,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";

import { Place } from "./place";
import { User } from "./user";
import { Job } from "./job";
import { Incomes } from "./incomes";
import { Charges } from "./charges";
import { Taxes } from "./taxes";
import { RealEstate } from "./realestate";

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
  Pacse = "Pacse",
  Marie = "Marie",
  Veuf = "Veuf",
}
registerEnumType(Family, {
  name: "Family",
  description: "Family situation",
});
export enum Type {
  Individuel = "Individuel",
  Collectif = "Collectif",
}
registerEnumType(Type, {
  name: "Type",
  description: "Bilan type",
});

export enum Bool {
  Oui = "Oui",
  Non = "Non",
}
registerEnumType(Bool, {
  name: "Bool",
  description: "Boolean french values",
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
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field(() => Type, { nullable: true })
  @Column({ nullable: true })
  type: Type;

  @Field(() => Gender)
  @Column({ nullable: true })
  gender: Gender;

  @Field(() => Family, { nullable: true })
  @Column({ nullable: true })
  family: Family;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthdate: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  dependants: string;

  @Field(() => Bool, { nullable: true })
  @Column({ nullable: true })
  employees: Bool;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  retirementAge?: string;

  @Field(() => Place, { nullable: true })
  @OneToOne(() => Place, { onDelete: "CASCADE" })
  @JoinColumn()
  place: Place;

  @Field(() => Incomes, { nullable: true })
  @OneToOne(() => Incomes, { onDelete: "CASCADE" })
  @JoinColumn()
  incomes: Incomes;

  @Field(() => Charges, { nullable: true })
  @OneToOne(() => Charges, { onDelete: "CASCADE" })
  @JoinColumn()
  charges: Charges;

  @Field(() => Taxes, { nullable: true })
  @OneToOne(() => Taxes, { onDelete: "CASCADE" })
  @JoinColumn()
  taxes: Taxes;

  @Field(() => RealEstate, { nullable: true })
  @OneToOne(() => RealEstate, { onDelete: "CASCADE" })
  @JoinColumn()
  realestate: RealEstate;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Field(() => Job, { nullable: true })
  @ManyToOne(() => Job, (job) => job.clients)
  job: Job;
}
