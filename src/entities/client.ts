import { ObjectType, Field } from "type-graphql";
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base";

@ObjectType()
@Entity("clients")
export class Client extends BaseEntity {
  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  civilite: string;

  @Field()
  @Column()
  family: string;

  @Field()
  @Column()
  birthdate: string;

  @Field()
  @Column()
  dependants: string;

  @Field()
  @Column()
  employees: string;

  @Field()
  @Column()
  job: string;

  @Field()
  @Column()
  retirementAge: string;

  @Field()
  @Column()
  adress: string;

  @Field()
  @Column()
  cedex: string;

  @Field()
  @Column()
  city: string;
}
