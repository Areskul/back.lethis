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
@Entity("users")
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
