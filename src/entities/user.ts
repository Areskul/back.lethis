import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;
}
