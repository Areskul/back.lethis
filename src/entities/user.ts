import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  Column,
  //ManyToMany,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base";
//import { Client } from "./client";

@ObjectType()
@Entity("users")
@Unique(["name", "email"])
export class User extends BaseEntity {
  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  //@Field(() => [Client])
  //@ManyToMany(() => Client)
  //@JoinTable()
  //clients: Client[];
}
