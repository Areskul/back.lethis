import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";

import { User } from "./user";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field()
  @Column()
  content: string;

  @Field(() => User!)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
