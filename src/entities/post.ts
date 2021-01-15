import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(() => User!)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
