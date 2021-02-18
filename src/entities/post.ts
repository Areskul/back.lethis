import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./base";

import { User } from "./user";

@ObjectType()
@Entity({
  name: "posts",
})
export class Post extends BaseEntity {
  @Field()
  @Column()
  content: string;

  @Field(() => User!)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  like: User[];

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  disllike: User[];
}
