import { ObjectType, Field } from "type-graphql";
import { Entity, Column, OneToMany, Unique } from "typeorm";
import { BaseEntity } from "./base";
import { Post } from "./post";

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

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
