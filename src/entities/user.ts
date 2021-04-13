import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToMany, JoinTable, Unique } from "typeorm";
import { BaseEntity } from "./base";
import { Client } from "./client";

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

  @Field(() => [Client])
  @OneToMany(() => Client, (client) => client.user)
  @JoinTable()
  clients: Client[];

  @Field()
  token: string;
}
